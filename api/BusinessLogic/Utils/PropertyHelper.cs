using BusinessLogic.Requests.User;
using System;
using System.Collections.Generic;
using System.Reflection;
using System.Text;

namespace BusinessLogic.Utils
{
    public static class PropertyHelper
    {
        public static T PatchObject<T>(T objectToUpdate, PatchRequest request)
        {
            foreach (PropertyInfo userProperty in objectToUpdate.GetType().GetProperties())
            {
                if (userProperty.Name.ToLower() == request.Property.ToLower())
                {
                    userProperty.SetValue(objectToUpdate, request.Value);
                }
            }
            return objectToUpdate;
        }
    }
}
