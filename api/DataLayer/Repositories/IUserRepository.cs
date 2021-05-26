using DataLayer.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace DataLayer.Repositories
{
    public interface IUserRepository
    {
        User Create(User user);
        User Delete(int userId);
        Task<User> GetByIdAsync(int id);
        Task<List<User>> GetUsersAsync();
        User Update(User userToUpdate);
    }
}