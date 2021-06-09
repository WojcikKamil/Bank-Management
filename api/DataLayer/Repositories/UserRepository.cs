﻿using DataLayer.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataLayer.Repositories
{
    public class UserRepository : Repository, IUserRepository
    {
        public UserRepository(BmDbContext context) : base(context) { }

        public User Create(User user)
        {
            _context.Users.Add(user);
            _context.SaveChanges();

            return user;
        }

        public async Task<User> GetByIdAsync(int id)
        {
            return await _context
                .Users
                .AsNoTracking()
                .FirstOrDefaultAsync(u => u.Id == id);
        }

        public async Task<List<User>> GetUsersAsync()
        {
            
            return await _context
                .Users
                .AsNoTracking()
                .ToListAsync();
        }

        public User Update(User userToUpdate)
        {
            _context.Update(userToUpdate);
            _context.SaveChanges();

            return userToUpdate;
        }

        public User Delete(int userId, int accountPlaceholderId)
        {
            User userToDelete = _context
                .Users
                .FirstOrDefault(u => u.Id == userId);

            if (userToDelete == null)
                return null;

            List<Account> accountsToRemove = new List<Account>();

            _context.Accounts
                .Where(a => a.UserId == userId)
                .ToList()
                .ForEach(account =>
                {
                    _context.Transactions
                    .Where(t => t.SenderId == account.Id || t.ReceiverId == account.Id)
                    .ToList()
                    .ForEach(transaction =>
                    {
                        if (transaction.SenderId == account.Id)
                            transaction.SenderId = accountPlaceholderId;
                        else if (transaction.ReceiverId == account.Id)
                            transaction.ReceiverId = accountPlaceholderId;
                    });

                    accountsToRemove.Add(account);
                });

            _context.Accounts.RemoveRange(accountsToRemove);
            _context.Users.Remove(userToDelete);
            _context.SaveChanges();

            return userToDelete;
        }
    }
}
