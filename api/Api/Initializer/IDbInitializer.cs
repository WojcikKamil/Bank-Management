namespace Api.Initializer
{
    public interface IDbInitializer
    {
        void Initialize();
        void SeedDataAsync();
    }
}