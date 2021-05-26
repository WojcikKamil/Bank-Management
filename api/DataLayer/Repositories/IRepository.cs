using System.Threading.Tasks;

namespace DataLayer.Repositories
{
    public interface IRepository
    {
        Task<int> SaveChangesAsync();
    }
}