using DESAFIOPROSPERI.Server.Data;
using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;

namespace DESAFIOPROSPERI.Server.Services
{
    public class RepositoryService<T> where T : class
    {
        private readonly DevDbContext _dbContext;

        public RepositoryService(DevDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<ICollection<T>> GetAllAsync()
        {
            return await _dbContext.Set<T>().ToListAsync();
        }

        public async Task<ICollection<T>> GetAllAsync(Expression<Func<T, object>> include1)
        {
            return await _dbContext.Set<T>().Include(include1).ToListAsync();
        }

        public async Task<ICollection<T>> GetAllAsync(Expression<Func<T, object>> include1, Expression<Func<T, object>> include2)
        {
            return await _dbContext.Set<T>().Include(include1).Include(include2).ToListAsync();
        }

        public async Task<T> GetOneByAsync(Expression<Func<T, bool>> pred)
        {
            return await _dbContext.Set<T>().FirstOrDefaultAsync(pred);
        }

        public async Task<T> GetOneByAsync(Expression<Func<T, bool>> pred, Expression<Func<T, object>> include1)
        {
            return await _dbContext.Set<T>().Include(include1).FirstOrDefaultAsync(pred);
        }

        public async Task<T> GetOneByAsync(Expression<Func<T, bool>> pred, Expression<Func<T, object>> include1, Expression<Func<T, object>> include2)
        {
            return await _dbContext.Set<T>().Include(include1).Include(include2).FirstOrDefaultAsync(pred);
        }

        public async Task AddAsync(T entity) 
        { 
            _dbContext.Set<T>().Add(entity);

            await _dbContext.SaveChangesAsync();
        }

        public async Task RemoveAsync(T entity)
        {
            _dbContext.Set<T>().Remove(entity);

            await _dbContext.SaveChangesAsync();
        }

        public async Task UpdateAsync(T entity)
        {
            _dbContext.Set<T>().Update(entity);

            await _dbContext.SaveChangesAsync();
        }
    }
}
