using BusinessLogic.Errors;
using BusinessLogic.Requests.User;
using BusinessLogic.Responses;
using BusinessLogic.Utils;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace BusinessLogic.Services
{
    public interface IUserService
    {
        Task<Result<UserResponse, UserError>> GetByIdAsync(int id);
        Task<Result<UserResponse, UserError>> GetUserByCredentials(LoginUserRequest request);
        Task<Result<IReadOnlyCollection<UserResponse>, UserError>> GetUsersAsync();
        Task<Result<UserResponse, UserError>> RegisterUser(RegisterUserRequest request);
        Task<Result<UserResponse, UserError>> PatchUser(PatchUserRequest request);
    }
}