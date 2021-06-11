using BusinessLogic.Errors;
using BusinessLogic.Requests.User;
using BusinessLogic.Responses;
using BusinessLogic.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Api.Controllers
{
    [Route("api/users")]
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;
        private readonly IOptions<AppSettings> _options;

        public UserController(IUserService userService, IOptions<AppSettings> options)
        {
            _userService = userService;
            _options = options;
        }

        [HttpGet]
        public async Task<ActionResult<IReadOnlyCollection<UserResponse>>> GetUsers()
        {
            var result = await _userService.GetUsersAsync();

            return result.isError
                ? HandleError(result.Error)
                : Ok(result.Value);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<UserResponse>> GetUserByIdAsync(int id)
        {
            var result = await _userService.GetByIdAsync(id);

            return result.isError
                ? HandleError(result.Error)
                : Ok(result.Value);
        }

        [HttpPost("register")]
        public async Task<ActionResult<UserResponse>> Register([FromBody] RegisterUserRequest request)
        {
            var result = await _userService.RegisterUser(request);

            return result.isError
                ? HandleError(result.Error)
                : Ok(result.Value);
        }

        [HttpPost("login")]
        public async Task<ActionResult> LogIn([FromBody] LoginUserRequest request)
        {
            var result = await _userService.GetUserByCredentials(request);

            return result.isError
                ? HandleError(result.Error)
                : Ok(result.Value);
        }

        [HttpPatch]
        public async Task<ActionResult> Patch([FromBody] PatchRequest request)
        {
            var result = await _userService.PatchUser(request);

            return result.isError
                ? HandleError(result.Error)
                : Ok(result.Value);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> Remove(int id)
        {
            var result = await _userService.RemoveUser(id, _options.Value.RemovedAccountPort);

            return result.isError
                ? HandleError(result.Error)
                : Ok(result.Value);
        }

        private ActionResult HandleError(UserError error)
        {
            return error switch
            {
                UserError.UserAlreadyExists => BadRequest("User with given credentials already exists in the database"),
                UserError.UserNotFound => NotFound("Requested user does not exist"),
                UserError.InvalidInput => NotFound("Please enter valid information"),
                _ => throw new InvalidOperationException($"Invalid error: {error}")
            };
        }
    }
}
