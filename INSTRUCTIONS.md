# How to Get Started:

## Frontend

Dogs and Litters
Searchable table that lists all the dogs/litters. Pagination required. Maybe 5 per page.

## Backend: Create the routes (CRUD)

Create a temp local filestore / similar to GCP bucket. Create CRUD interface for filestore changes

I'm thinking of setuping buckets such as 

```
/dogs
/litters
/etc
/social-media
```

In the dogs folder
```
<dog-name>/info.yaml
<dog-name>/images/<image>.png
```


## Backend: Setup Integrations
Once both are running, your Angular app will try to connect to the NestJS backend on http://localhost:3000.
Navigate to /dogs or /litters to see the initial data.
Go to /login and use admin/password to log in. Then navigate to /admin/dogs or /admin/litters to try adding, editing, or deleting entries.
Test the file upload functionality in the admin panels (it will attempt to upload to your configured GCS bucket).
This initial implementation provides the core structure and basic CRUD operations for your main entities. You can now expand upon this by:

Implementing real database integration (Cloud SQL with TypeORM/Prisma).
Enhancing authentication (JWT, OAuth).
Improving UI/UX with more advanced Angular Material components or Tailwind CSS.
Adding more detailed validation and error handling.
Developing the "Keeping up the Goldens" page with actual Instagram API integration (which will be a significant task itself).
Building out the Inquiries view for the admin.
Let me know if you have any questions or need further assistance as you develop!
