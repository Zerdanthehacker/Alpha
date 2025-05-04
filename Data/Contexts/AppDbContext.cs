using Data.Entities;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Data.Contexts;

public class AppDbContext(DbContextOptions<AppDbContext> options) : IdentityDbContext<UserEntity>(options)
{
    public virtual required DbSet<ClientEntity> Clients { get; set; }
    public virtual required DbSet<ProjectEntity> Projects { get; set; }
    public virtual required DbSet<StatusEntity> Statuses { get; set; }
}
