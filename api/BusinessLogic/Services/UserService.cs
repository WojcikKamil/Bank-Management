﻿using BusinessLogic.Errors;
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
        private readonly IUserRepository _userRepository;
        private readonly IAccountRepository _accountRepository;

        public UserService(IUserRepository userRepository, IAccountRepository accountRepository)
        {
            _userRepository = userRepository;
            _accountRepository = accountRepository;
        }

        public async Task<Result<UserResponse, UserError>> GetByIdAsync(int id)
        {
            User user = await _userRepository.GetByIdAsync(id);

            return user != null
                ? UserMapper.FromModelToResult(user)
                : new Result<UserResponse, UserError>(UserError.UserNotFound);
        }

        public async Task<Result<IReadOnlyCollection<UserResponse>, UserError>> GetUsersAsync()
        {
            List<User> usersListModel = await _userRepository.GetUsersAsync();
            List<UserResponse> usersListResponse = usersListModel.Select(u => UserMapper.FromModelToResponse(u)).ToList();

            return new Result<IReadOnlyCollection<UserResponse>, UserError>(usersListResponse);
        }

        public async Task<Result<UserResponse, UserError>> GetUserByCredentials(LoginUserRequest request)
        {
            List<User> usersListModel = await _userRepository.GetUsersAsync();
            User requestedUserModel = usersListModel.FirstOrDefault(u => u.Login == request.Login && u.Password == request.Password);

            return requestedUserModel != null
                ? UserMapper.FromModelToResult(requestedUserModel)
                : new Result<UserResponse, UserError>(UserError.UserNotFound);
        }

        public async Task<Result<UserResponse, UserError>> RegisterUser(RegisterUserRequest request)
        {
            if(string.IsNullOrEmpty(request.Name) || string.IsNullOrEmpty(request.Password) || string.IsNullOrEmpty(request.Surname))
                return new Result<UserResponse, UserError>(UserError.InvalidInput);

            string loginString = "";
            string accountString = "";
            bool isLoginAvailable = false;

            do
            {
                int loginInt = new Random().Next(10000000,99999999);
                loginString = loginInt.ToString();
                isLoginAvailable = (await _userRepository.GetUsersAsync()).Any(u => u.Login == loginString);
            }
            while (isLoginAvailable != true);

            do
            {
                int loginInt = new Random().Next(10000000, 99999999);
                accountString = loginInt.ToString();
                isLoginAvailable = (await _accountRepository.GetAccountsAsync()).Any(u => u.Number == loginString);
            }
            while (isLoginAvailable != true);

            Account assignedAccount = _accountRepository.Create(new Account
            {
                Number = accountString,
                Balance = 0,               
            });

            User registeredUserModel = _userRepository.Create(new User { 
                Name = request.Name, 
                Surname = request.Surname,
                Login = loginString,
                Password = request.Password,
                IsBanker = request.isBanker,
            });

            return UserMapper.FromModelToResult(registeredUserModel);
        }
    }
}