using BusinessLogic.Errors;
using BusinessLogic.Mappers;
using BusinessLogic.Requests.User;
using BusinessLogic.Responses;
using BusinessLogic.Utils;
using DataLayer.Models;
using DataLayer.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLogic.Services
{
    public class UserService : IUserService 
    {
        private readonly IUserRepository _repository;

        public UserService(IUserRepository repository)
        {
            _repository = repository;
        }

        public async Task<Result<UserResponse, UserError>> GetByIdAsync(int id)
        {
            User user = await _repository.GetByIdAsync(id);

            return user != null
                ? UserMapper.FromModelToResult(user)
                : new Result<UserResponse, UserError>(UserError.UserNotFound);
        }

        public async Task<Result<IReadOnlyCollection<UserResponse>, UserError>> GetUsersAsync()
        {
            List<User> usersListModel = await _repository.GetUsersAsync();
            List<UserResponse> usersListResponse = usersListModel.Select(u => UserMapper.FromModelToResponse(u)).ToList();

            return new Result<IReadOnlyCollection<UserResponse>, UserError>(usersListResponse);
        }

        public async Task<Result<UserResponse, UserError>> GetUserByCredentials(LoginUserRequest request)
        {
            List<User> usersListModel = await _repository.GetUsersAsync();
            User requestedUserModel = usersListModel.FirstOrDefault(u => u.Name == request.Name && u.Password == request.Password);

            return requestedUserModel != null
                ? UserMapper.FromModelToResult(requestedUserModel)
                : new Result<UserResponse, UserError>(UserError.UserNotFound);
        }

        public async Task<Result<UserResponse, UserError>> RegisterUser(RegisterUserRequest request)
        {
            if(string.IsNullOrEmpty(request.Name) || string.IsNullOrEmpty(request.Password))
                return new Result<UserResponse, UserError>(UserError.InvalidInput);
            

            List<User> userListModel = await _repository.GetUsersAsync();
            
            if (userListModel.Any(u => u.Name == request.Name))
                return new Result<UserResponse, UserError>(UserError.UserAlreadyExists);

            User registeredUserModel = _repository.Create(new User { Name = request.Name, Password = request.Password });

            return UserMapper.FromModelToResult(registeredUserModel);
        }
    }
}
