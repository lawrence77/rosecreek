// --- NestJS Backend Setup Instructions ---
// 1. Make sure you have Node.js installed.
// 2. Install NestJS CLI globally: `npm install -g @nestjs/cli`
// 3. Create a new NestJS project:
//    `nest new rosecreek-backend`
//    (Choose npm as package manager)
// 4. Navigate into the project directory: `cd rosecreek-backend`
// 5. Install additional dependencies:
//    `npm install @nestjs/platform-express @nestjs/common @nestjs/core uuid multer @google-cloud/storage`
//    (uuid for generating IDs, multer for file uploads, @google-cloud/storage for GCS)
// 6. Replace the contents of the following files with the code below.
// 7. To run the NestJS app: `npm run start:dev`
//    It will typically run on `http://localhost:3000`

// --- src/main.ts ---
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS for your Angular frontend
  app.enableCors({
    origin: 'http://localhost:4200', // Allow your Angular app to access the backend
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  // Enable global validation pipes for DTOs
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true, // Remove properties not defined in DTOs
    forbidNonWhitelisted: true, // Throw error if non-whitelisted properties are present
    transform: true, // Automatically transform payloads to DTO instances
  }));

  const port = process.env.PORT || 3000;
  await app.listen(port);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();

// --- src/app.module.ts ---
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DogsModule } from './dogs/dogs.module';
import { LittersModule } from './litters/litters.module';
import { InquiriesModule } from './inquiries/inquiries.module';
import { AuthModule } from './auth/auth.module';
import { FilesModule } from './files/files.module';
import { ConfigModule } from '@nestjs/config'; // Import ConfigModule

@Module({
  imports: [
    // Load environment variables from .env file
    ConfigModule.forRoot({
      isGlobal: true, // Makes the config module available globally
    }),
    DogsModule,
    LittersModule,
    InquiriesModule,
    AuthModule,
    FilesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

// --- src/app.controller.ts ---
import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}

// --- src/app.service.ts ---
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Welcome to the Rose Creek Retrievers API!';
  }
}

// --- src/dogs/dogs.module.ts ---
import { Module } from '@nestjs/common';
import { DogsController } from './dogs.controller';
import { DogsService } from './dogs.service';

@Module({
  controllers: [DogsController],
  providers: [DogsService],
  exports: [DogsService], // Export service if other modules need to use it
})
export class DogsModule {}

// --- src/dogs/dogs.controller.ts ---
import { Controller, Get, Post, Put, Delete, Param, Body, NotFoundException, HttpCode, HttpStatus } from '@nestjs/common';
import { DogsService } from './dogs.service';
import { CreateDogDto, UpdateDogDto } from './dto/dog.dto'; // Import DTOs

@Controller('dogs')
export class DogsController {
  constructor(private readonly dogsService: DogsService) {}

  @Get()
  findAll() {
    return this.dogsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    const dog = this.dogsService.findOne(id);
    if (!dog) {
      throw new NotFoundException(`Dog with ID "${id}" not found.`);
    }
    return dog;
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createDogDto: CreateDogDto) {
    return this.dogsService.create(createDogDto);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateDogDto: UpdateDogDto) {
    const updatedDog = this.dogsService.update(id, updateDogDto);
    if (!updatedDog) {
      throw new NotFoundException(`Dog with ID "${id}" not found.`);
    }
    return updatedDog;
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT) // 204 No Content for successful deletion
  remove(@Param('id') id: string) {
    const deleted = this.dogsService.remove(id);
    if (!deleted) {
      throw new NotFoundException(`Dog with ID "${id}" not found.`);
    }
  }
}

// --- src/dogs/dogs.service.ts ---
import { Injectable } from '@nestjs/common';
import { Dog } from './interfaces/dog.interface';
import { v4 as uuidv4 } from 'uuid'; // For generating unique IDs

@Injectable()
export class DogsService {
  // In-memory array to simulate database storage
  private readonly dogs: Dog[] = [
    {
      id: 'dog-1',
      name: 'Buddy',
      pedigree: 'Champion Bloodline A',
      titles: 'CH, GCH',
      photos: ['https://placehold.co/200x200/FFD97D/000000?text=Buddy'],
      description: 'A handsome and intelligent male Golden Retriever with a loving temperament.',
      healthClearances: ['https://www.africau.edu/images/default/sample.pdf'],
      damId: 'dog-3',
      sireId: 'dog-2',
    },
    {
      id: 'dog-2',
      name: 'Daisy',
      pedigree: 'Show Dog Line B',
      titles: 'CD, RN',
      photos: ['https://placehold.co/200x200/FFC72C/000000?text=Daisy'],
      description: 'A sweet and playful female Golden Retriever, excellent with children.',
      healthClearances: [],
      damId: null,
      sireId: null,
    },
    {
      id: 'dog-3',
      name: 'Max',
      pedigree: 'Working Dog Line C',
      titles: 'JH',
      photos: ['https://placehold.co/200x200/FFD97D/000000?text=Max'],
      description: 'Energetic and eager to please, great for active families.',
      healthClearances: [],
      damId: null,
      sireId: null,
    },
  ];

  findAll(): Dog[] {
    return this.dogs;
  }

  findOne(id: string): Dog | undefined {
    return this.dogs.find((dog) => dog.id === id);
  }

  create(dog: Omit<Dog, 'id'>): Dog {
    const newDog: Dog = { id: uuidv4(), ...dog };
    this.dogs.push(newDog);
    return newDog;
  }

  update(id: string, updatedDog: Partial<Dog>): Dog | undefined {
    const index = this.dogs.findIndex((dog) => dog.id === id);
    if (index > -1) {
      this.dogs[index] = { ...this.dogs[index], ...updatedDog, id: this.dogs[index].id }; // Ensure ID is preserved
      return this.dogs[index];
    }
    return undefined;
  }

  remove(id: string): boolean {
    const initialLength = this.dogs.length;
    this.dogs.splice(
      this.dogs.findIndex((dog) => dog.id === id),
      1,
    );
    return this.dogs.length < initialLength;
  }

  // --- Database Integration Notes ---
  // To integrate with a real database (e.g., Cloud SQL with PostgreSQL):
  // 1. Install TypeORM or Prisma: `npm install @nestjs/typeorm typeorm pg` or `npm install @prisma/client prisma`
  // 2. Configure your database connection in `app.module.ts` or a dedicated database module.
  // 3. Define TypeORM entities or Prisma schemas for your Dog, Litter, Inquiry models.
  // 4. Replace the in-memory array operations (`this.dogs.push`, `this.dogs.find`, etc.)
  //    with TypeORM repository methods (e.g., `this.dogRepository.find()`, `this.dogRepository.save()`).
  // 5. You'll need to set up your Cloud SQL instance and ensure your NestJS app
  //    can connect to it (e.g., using environment variables for credentials).
}

// --- src/dogs/interfaces/dog.interface.ts ---
export interface Dog {
  id: string;
  name: string;
  pedigree: string;
  titles: string;
  photos: string[]; // Array of photo URLs
  description: string;
  healthClearances: string[]; // Array of document URLs
  damId: string | null; // ID of the dam (mother)
  sireId: string | null; // ID of the sire (father)
}

// --- src/dogs/dto/dog.dto.ts ---
import { IsString, IsOptional, IsArray, IsUrl, IsNotEmpty } from 'class-validator';

export class CreateDogDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  pedigree: string;

  @IsOptional()
  @IsString()
  titles?: string;

  @IsOptional()
  @IsArray()
  @IsUrl({}, { each: true }) // Validate each item in the array as a URL
  photos?: string[];

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsOptional()
  @IsArray()
  @IsUrl({}, { each: true })
  healthClearances?: string[];

  @IsOptional()
  @IsString()
  damId?: string;

  @IsOptional()
  @IsString()
  sireId?: string;
}

export class UpdateDogDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  pedigree?: string;

  @IsOptional()
  @IsString()
  titles?: string;

  @IsOptional()
  @IsArray()
  @IsUrl({}, { each: true })
  photos?: string[];

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsArray()
  @IsUrl({}, { each: true })
  healthClearances?: string[];

  @IsOptional()
  @IsString()
  damId?: string;

  @IsOptional()
  @IsString()
  sireId?: string;
}


// --- src/litters/litters.module.ts ---
import { Module } from '@nestjs/common';
import { LittersController } from './litters.controller';
import { LittersService } from './litters.service';

@Module({
  controllers: [LittersController],
  providers: [LittersService],
  exports: [LittersService],
})
export class LittersModule {}

// --- src/litters/litters.controller.ts ---
import { Controller, Get, Post, Put, Delete, Param, Body, NotFoundException, HttpCode, HttpStatus } from '@nestjs/common';
import { LittersService } from './litters.service';
import { CreateLitterDto, UpdateLitterDto } from './dto/litter.dto'; // Import DTOs

@Controller('litters')
export class LittersController {
  constructor(private readonly littersService: LittersService) {}

  @Get()
  findAll() {
    return this.littersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    const litter = this.littersService.findOne(id);
    if (!litter) {
      throw new NotFoundException(`Litter with ID "${id}" not found.`);
    }
    return litter;
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createLitterDto: CreateLitterDto) {
    return this.littersService.create(createLitterDto);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateLitterDto: UpdateLitterDto) {
    const updatedLitter = this.littersService.update(id, updateLitterDto);
    if (!updatedLitter) {
      throw new NotFoundException(`Litter with ID "${id}" not found.`);
    }
    return updatedLitter;
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string) {
    const deleted = this.littersService.remove(id);
    if (!deleted) {
      throw new NotFoundException(`Litter with ID "${id}" not found.`);
    }
  }
}

// --- src/litters/litters.service.ts ---
import { Injectable } from '@nestjs/common';
import { Litter } from './interfaces/litter.interface';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class LittersService {
  // In-memory array to simulate database storage
  private readonly litters: Litter[] = [
    {
      id: 'litter-1',
      name: 'Spring Puppies 2024',
      damId: 'dog-2', // Daisy
      sireId: 'dog-1', // Buddy
      photos: ['https://placehold.co/200x200/957DAD/FFFFFF?text=Litter1'],
      description: 'Our beautiful Spring 2024 litter, born on April 1st.',
      status: 'past',
    },
    {
      id: 'litter-2',
      name: 'Summer Goldens 2025',
      damId: 'dog-3', // Max (assuming Max is female for this example, or use another dog ID)
      sireId: 'dog-1', // Buddy
      photos: ['https://placehold.co/200x200/D291BC/FFFFFF?text=Litter2'],
      description: 'Anticipated litter for Summer 2025, expected June.',
      status: 'future',
    },
  ];

  findAll(): Litter[] {
    return this.litters;
  }

  findOne(id: string): Litter | undefined {
    return this.litters.find((litter) => litter.id === id);
  }

  create(litter: Omit<Litter, 'id'>): Litter {
    const newLitter: Litter = { id: uuidv4(), ...litter };
    this.litters.push(newLitter);
    return newLitter;
  }

  update(id: string, updatedLitter: Partial<Litter>): Litter | undefined {
    const index = this.litters.findIndex((litter) => litter.id === id);
    if (index > -1) {
      this.litters[index] = { ...this.litters[index], ...updatedLitter, id: this.litters[index].id };
      return this.litters[index];
    }
    return undefined;
  }

  remove(id: string): boolean {
    const initialLength = this.litters.length;
    this.litters.splice(
      this.litters.findIndex((litter) => litter.id === id),
      1,
    );
    return this.litters.length < initialLength;
  }
}

// --- src/litters/interfaces/litter.interface.ts ---
export interface Litter {
  id: string;
  name: string;
  damId: string;
  sireId: string;
  photos: string[]; // Array of photo URLs
  description: string;
  status: 'past' | 'current' | 'future';
}

// --- src/litters/dto/litter.dto.ts ---
import { IsString, IsOptional, IsArray, IsUrl, IsNotEmpty, IsIn } from 'class-validator';

export class CreateLitterDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  damId: string;

  @IsNotEmpty()
  @IsString()
  sireId: string;

  @IsOptional()
  @IsArray()
  @IsUrl({}, { each: true })
  photos?: string[];

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsString()
  @IsIn(['past', 'current', 'future'])
  status: 'past' | 'current' | 'future';
}

export class UpdateLitterDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  damId?: string;

  @IsOptional()
  @IsString()
  sireId?: string;

  @IsOptional()
  @IsArray()
  @IsUrl({}, { each: true })
  photos?: string[];

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  @IsIn(['past', 'current', 'future'])
  status?: 'past' | 'current' | 'future';
}

// --- src/inquiries/inquiries.module.ts ---
import { Module } from '@nestjs/common';
import { InquiriesController } from './inquiries.controller';
import { InquiriesService } from './inquiries.service';

@Module({
  controllers: [InquiriesController],
  providers: [InquiriesService],
  exports: [InquiriesService],
})
export class InquiriesModule {}

// --- src/inquiries/inquiries.controller.ts ---
import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { InquiriesService } from './inquiries.service';
import { CreateInquiryDto } from './dto/inquiry.dto';

@Controller('inquiries')
export class InquiriesController {
  constructor(private readonly inquiriesService: InquiriesService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createInquiryDto: CreateInquiryDto) {
    return this.inquiriesService.create(createInquiryDto);
  }

  // You might add GET endpoints for admin to view inquiries later
}

// --- src/inquiries/inquiries.service.ts ---
import { Injectable } from '@nestjs/common';
import { Inquiry } from './interfaces/inquiry.interface';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class InquiriesService {
  // In-memory array to simulate database storage for inquiries
  private readonly inquiries: Inquiry[] = [];

  create(inquiry: Omit<Inquiry, 'id' | 'timestamp'>): Inquiry {
    const newInquiry: Inquiry = {
      id: uuidv4(),
      timestamp: new Date().toISOString(),
      ...inquiry,
    };
    this.inquiries.push(newInquiry);
    console.log('New inquiry received:', newInquiry); // Log to console for now
    return newInquiry;
  }

  findAll(): Inquiry[] {
    return this.inquiries;
  }
}

// --- src/inquiries/interfaces/inquiry.interface.ts ---
export interface Inquiry {
  id: string;
  customerName: string;
  customerEmail: string;
  message: string;
  dogInterest?: string;
  timestamp: string;
}

// --- src/inquiries/dto/inquiry.dto.ts ---
import { IsString, IsEmail, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateInquiryDto {
  @IsNotEmpty()
  @IsString()
  customerName: string;

  @IsNotEmpty()
  @IsEmail()
  customerEmail: string;

  @IsNotEmpty()
  @IsString()
  message: string;

  @IsOptional()
  @IsString()
  dogInterest?: string;
}

// --- src/auth/auth.module.ts ---
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';

@Module({
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}

// --- src/auth/auth.controller.ts ---
import { Controller, Post, Body, HttpCode, HttpStatus, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() loginDto: LoginDto) {
    const user = await this.authService.validateUser(loginDto.username, loginDto.password);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    // In a real app, you'd return a JWT token here
    return { message: 'Login successful', user: { username: user.username, role: user.role } };
  }
}

// --- src/auth/auth.service.ts ---
import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  // Dummy user for demonstration
  private readonly users = [
    { username: 'admin', password: 'password', role: 'admin' },
  ];

  async validateUser(username: string, pass: string): Promise<any> {
    const user = this.users.find(u => u.username === username && u.password === pass);
    if (user) {
      // In a real application, you would hash passwords and compare them securely
      const { password, ...result } = user; // Exclude password from returned user object
      return result;
    }
    return null;
  }
}

// --- src/auth/dto/login.dto.ts ---
import { IsString, IsNotEmpty } from 'class-validator';

export class LoginDto {
  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}

// --- src/files/files.module.ts ---
import { Module } from '@nestjs/common';
import { FilesController } from './files.controller';
import { FilesService } from './files.service';
import { MulterModule } from '@nestjs/platform-express'; // Import MulterModule

@Module({
  imports: [
    // Configure Multer for file uploads.
    // For production, consider storing files temporarily on disk or streaming directly to GCS.
    MulterModule.register({
      dest: './uploads', // Temporary directory for file uploads
    }),
  ],
  controllers: [FilesController],
  providers: [FilesService],
})
export class FilesModule {}

// --- src/files/files.controller.ts ---
import { Controller, Post, UseInterceptors, UploadedFile, BadRequestException, Res, Get, Param } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { FilesService } from './files.service';
import { Response } from 'express'; // Import Response from express
import { join } from 'path'; // For path manipulation

@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file')) // 'file' is the field name for the uploaded file
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException('No file uploaded.');
    }

    // Call the service to upload to GCS
    const publicUrl = await this.filesService.uploadFile(file);

    return {
      message: 'File uploaded successfully!',
      filename: file.originalname,
      url: publicUrl,
    };
  }

  // Optional: Endpoint to serve files directly from the backend (less efficient than direct GCS links)
  // This is typically not needed if GCS URLs are used directly by the frontend.
  // @Get(':filename')
  // async serveFile(@Param('filename') filename: string, @Res() res: Response) {
  //   const filePath = join(process.cwd(), 'uploads', filename); // Assuming files are stored locally in 'uploads'
  //   res.sendFile(filePath);
  // }
}

// --- src/files/files.service.ts ---
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Storage } from '@google-cloud/storage';
import { ConfigService } from '@nestjs/config'; // Import ConfigService

@Injectable()
export class FilesService {
  private storage: Storage;
  private bucketName: string;

  constructor(private configService: ConfigService) {
    // Initialize Google Cloud Storage
    // IMPORTANT: Ensure your GOOGLE_APPLICATION_CREDENTIALS environment variable
    // is set to the path of your service account key file when running locally.
    // For deployment on Cloud Run, it will automatically use the service account
    // associated with the Cloud Run instance.
    this.storage = new Storage({
      projectId: this.configService.get<string>('GCP_PROJECT_ID'),
      // keyFilename: this.configService.get<string>('GCP_KEY_FILE_PATH'), // Only for local development if not using GOOGLE_APPLICATION_CREDENTIALS env var
    });
    this.bucketName = this.configService.get<string>('GCS_BUCKET_NAME');

    if (!this.bucketName) {
      console.error('GCS_BUCKET_NAME is not defined in environment variables.');
      // In a real app, you might throw an error or handle this more gracefully
    }
  }

  async uploadFile(file: Express.Multer.File): Promise<string> {
    if (!this.bucketName) {
      throw new InternalServerErrorException('Google Cloud Storage bucket name is not configured.');
    }

    const bucket = this.storage.bucket(this.bucketName);
    // Generate a unique filename to prevent collisions
    const filename = `${Date.now()}-${file.originalname}`;
    const blob = bucket.file(filename);
    const blobStream = blob.createWriteStream({
      resumable: false, // For smaller files, resumable can be false
      metadata: {
        contentType: file.mimetype,
      },
      public: true, // Make the file publicly accessible
    });

    return new Promise((resolve, reject) => {
      blobStream.on('error', (err) => {
        console.error('GCS Upload Error:', err);
        reject(new InternalServerErrorException('Failed to upload file to Google Cloud Storage.'));
      });

      blobStream.on('finish', () => {
        // The public URL for the file
        const publicUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;
        resolve(publicUrl);
      });

      blobStream.end(file.buffer); // Use file.buffer for in-memory files from Multer
    });
  }
}

// --- Create a .env file in the root of your NestJS project (rosecreek-backend/.env) ---
// This file is for local development environment variables.
// DO NOT commit this file to version control if it contains sensitive keys.

// Example .env content:
// GCP_PROJECT_ID=your-gcp-project-id
// GCS_BUCKET_NAME=your-gcs-bucket-name
// GCP_KEY_FILE_PATH=/path/to/your/service-account-key.json # Only needed if not using GOOGLE_APPLICATION_CREDENTIALS env var

// --- NestJS package.json (relevant scripts and dependencies after `npm install`) ---
/*
{
  "name": "rosecreek-backend",
  "version": "0.0.1",
  "description": "",
  "author": "",
  "private": true,
  "license": "UNLICENSED",
  "scripts": {
    "build": "nest build",
    "format": "prettier --write \"{src,apps,libs,test}/**/*.ts\"",
    "start": "nest start",
    "start:dev": "nest start --watch",
    "start:debug": "nest start --debug --watch",
    "start:prod": "node dist/main",
    "lint": "eslint \"{src,apps,libs,test}/**/*.ts\" --fix",
    "test": "jest",
    "test:watch": "jest --watch",
    "test:cov": "jest --coverage",
    "test:debug": "node --inspect-brk -r tsconfig-paths/register -r jest-extended/bin/jest-extended.js node_modules/.bin/jest --runInBand",
    "test:e2e": "jest --config ./test/jest-e2e.json"
  },
  "dependencies": {
    "@nestjs/common": "^10.0.0",
    "@nestjs/config": "^3.2.2", // Added for ConfigModule
    "@nestjs/core": "^10.0.0",
    "@nestjs/platform-express": "^10.0.0",
    "@google-cloud/storage": "^7.11.0", // Added for GCS
    "class-transformer": "^0.5.1",
    "class-validator": "^0.14.0",
    "multer": "^1.4.5-lts.1", // Added for file uploads
    "reflect-metadata": "^0.2.0",
    "rxjs": "^7.8.1",
    "uuid": "^9.0.1" // Added for generating IDs
  },
  "devDependencies": {
    "@nestjs/cli": "^10.0.0",
    "@nestjs/schematics": "^10.0.0",
    "@nestjs/testing": "^10.0.0",
    "@types/express": "^4.17.17",
    "@types/jest": "^29.5.2",
    "@types/multer": "^1.4.11", // Added for Multer types
    "@types/node": "^20.3.1",
    "@types/supertest": "^2.0.12",
    "@types/uuid": "^9.0.8", // Added for uuid types
    "@typescript-eslint/eslint-plugin": "^6.0.0",
    "@typescript-eslint/parser": "^6.0.0",
    "eslint": "^8.42.0",
    "eslint-config-prettier": "^9.0.0",
    "eslint-plugin-prettier": "^5.0.0",
    "jest": "^29.5.2",
    "prettier": "^3.0.0",
    "source-map-support": "^0.5.21",
    "supertest": "^6.3.3",
    "ts-jest": "^29.1.0",
    "ts-loader": "^9.4.3",
    "ts-node": "^10.9.1",
    "tsconfig-paths": "^4.2.0",
    "typescript": "^5.1.3"
  },
  "jest": {
    "moduleFileExtensions": [
      "js",
      "json",
      "ts"
    ],
    "rootDir": "src",
    "testRegex": ".*\\.spec\\.ts$",
    "transform": {
      "^.+\\.(t|j)s$": "ts-jest"
    },
    "collectCoverageFrom": [
      "**/*.(t|j)s"
    ],
    "coverageDirectory": "../coverage",
    "testEnvironment": "node"
  }
}
*/
