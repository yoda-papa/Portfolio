using AutoMapper;
using Portfolio.Data.Models;
using Portfolio.Api.Dtos;

namespace Portfolio.Api.Profiles
{
    public class ProjectProfile : Profile
    {
        public ProjectProfile()
        {
            // Source -> Target
            CreateMap<Project, ProjectDto>();
            CreateMap<ProjectCreateDto, Project>();
            CreateMap<ProjectDto, Project>(); // For mapping from DTO to entity in updates
        }
    }
} 