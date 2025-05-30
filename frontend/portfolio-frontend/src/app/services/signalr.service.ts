import { Injectable } from '@angular/core';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SignalRService {
  private hubConnection: HubConnection;
  private visitorCount = new BehaviorSubject<number>(0);
  visitorCount$ = this.visitorCount.asObservable();
  private connectionPromise: Promise<void> | null = null;

  constructor() {
    this.hubConnection = new HubConnectionBuilder()
      .withUrl('http://localhost:5102/portfolioHub', {
        withCredentials: true
      })
      .withAutomaticReconnect()
      .build();

    // Don't start connection in constructor
    this.setupConnection();
  }

  private setupConnection() {
    // Subscribe to visitor count updates
    this.hubConnection.on('UpdateVisitorCount', (count: number) => {
      this.visitorCount.next(count);
    });

    // Handle connection state changes
    this.hubConnection.onclose(() => {
      console.log('SignalR connection closed');
      this.visitorCount.next(0);
    });
  }

  public async startConnection(): Promise<void> {
    if (this.connectionPromise) {
      return this.connectionPromise;
    }

    this.connectionPromise = this.hubConnection.start()
      .then(() => {
        console.log('SignalR Connected!');
      })
      .catch(err => {
        console.error('Error while starting connection: ', err);
        this.connectionPromise = null;
        // Don't retry automatically, let the component handle retries
        throw err;
      });

    return this.connectionPromise;
  }

  // Method to send chat messages
  async sendChatMessage(message: string) {
    try {
      await this.hubConnection.invoke('SendMessage', message);
    } catch (err) {
      console.error('Error while sending message: ', err);
    }
  }

  // Method to subscribe to chat messages
  onChatMessage(callback: (message: string) => void) {
    this.hubConnection.on('ReceiveMessage', callback);
  }
} 