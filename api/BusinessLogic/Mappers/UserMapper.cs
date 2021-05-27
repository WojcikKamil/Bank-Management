using BusinessLogic.Errors;
using BusinessLogic.Responses;
using BusinessLogic.Utils;
using DataLayer.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace BusinessLogic.Mappers
{
    public static class UserMapper
    {
        public static Result<UserResponse, UserError> FromModelToResult(User user)
            => new Result<UserResponse, UserError>(new UserResponse
            {
                Id = user.Id,
                Password = user.Password.Trim(),
                IsBanker = user.IsBanker,
                Login = user.Login.Trim(),
                Name = user.Name.Trim(),
                Surname = user.Name.Trim()
            });

        public static UserResponse FromModelToResponse(User user)
            => new UserResponse
            {
                Id = user.Id,
                Password = user.Password.Trim(),
                IsBanker = user.IsBanker,
                Login = user.Login.Trim(),
                Name = user.Name.Trim(),
                Surname = user.Name.Trim()
            };

        public static Result<RegisterResponse, UserError> FromModelToRegisterResult(User user, int accountId)
            => new Result<RegisterResponse, UserError>(new RegisterResponse
            {
                Id = user.Id,
                Password = user.Password.Trim(),
                IsBanker = user.IsBanker,
                Login = user.Login.Trim(),
                Name = user.Name.Trim(),
                Surname = user.Name.Trim(),
                AccountId = accountId
            });
    }
}
