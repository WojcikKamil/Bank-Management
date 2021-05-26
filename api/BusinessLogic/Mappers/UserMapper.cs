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
            Name = user.Name.Trim(),
            Password = user.Password.Trim(),
        });

        public static UserResponse FromModelToResponse(User user)
            => new UserResponse
            {
                Id = user.Id,
                Name = user.Name.Trim(),
                Password = user.Password.Trim(),
            };
    }
}
