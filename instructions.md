# Product Requirements Document (PRD)

## Project Overview

### Summary

We are building a web application that allows users to optimize their resumes based on job descriptions. The application will analyze the user's resume against the job description using AI (OpenAI's GPT-4 model) and provide suggestions for improvement, ensuring better alignment with Applicant Tracking Systems (ATS). Users can upload their resumes in various formats, create and save multiple versions for different job applications, and customize templates and font styles. The application will feature a user-friendly interface built with React, Node.js, Lucid Icons, and will use Supabase for backend services.

### Goals

- **Improve User Employability**: Help users tailor their resumes to specific job descriptions, increasing their chances of getting noticed by recruiters and ATS.
- **User-Friendly Experience**: Provide an intuitive interface for easy navigation and usage.
- **Customization**: Allow users to customize their resumes with different templates and styles.
- **Data Security**: Ensure user data, including resumes and personal information, is securely stored and handled.

---

## Core Functionalities

### 1. Job Description Analysis

- **Description**: Analyze job descriptions to extract key skills and requirements.
- **Implementation**:
    - Utilize OpenAI's GPT-4 model to parse and analyze the job description.
    - Extract and list key skills, qualifications, and requirements.
- **Example**:
    - **Input**: User pastes a job description.
    - **Output**: A list of extracted skills and requirements displayed to the user.

### 2. Resume Matching and Scoring

- **Description**: Match the user's resume against the job description and provide a compatibility score.
- **Implementation**:
    - Use OpenAI's GPT-4 model to compare the resume content with the extracted job requirements.
    - Generate a score and highlight areas of improvement.
- **Example**:
    - **Input**: User uploads their resume and provides a job description.
    - **Output**: A compatibility score out of 100 and specific feedback.

### 3. Resume Improvement Suggestions

- **Description**: Provide AI-driven suggestions to enhance the resume based on the job description and ATS criteria.
- **Implementation**:
    - Analyze the resume for ATS optimization (keyword usage, formatting, etc.).
    - Suggest additions or modifications to align better with the job requirements.
- **Example**:
    - **Input**: User's resume and job description.
    - **Output**: Suggestions like "Include 'TypeScript' in your skills section" or "Elaborate on your experience with Node.js."

### 4. Multiple Resume Versions

- **Description**: Allow users to create, save, and manage multiple resume versions tailored to different job applications.
- **Implementation**:
    - Use Supabase to store and retrieve different resume versions per user.
    - Provide CRUD operations (Create, Read, Update, Delete) for resume versions.
- **Example**:
    - **User Flow**: User saves a tailored resume for a Software Engineer position and creates another for a Project Manager role.

### 5. User-Friendly Interface

- **Description**: Design an intuitive UI for easy navigation and interaction.
- **Implementation**:
    - Build the frontend using React and Lucid Icons for visual elements.
    - Ensure responsive design for various devices.
- **Example**:
    - **Features**: Clear navigation menus, drag-and-drop file upload, real-time feedback display.

### 6. Resume Upload in Various Formats

- **Description**: Support uploading resumes in PDF, DOC, DOCX, TXT, and other common formats.
- **Implementation**:
    - Use libraries like `pdf-lib` for PDFs, `docx-parser` for DOCX files, and handle TXT files as plain text.
    - Implement file validation and error handling.
- **Example**:
    - **User Flow**: User uploads a DOCX file, and the content is correctly parsed and displayed in the application.

### 7. Resume Customization

- **Description**: Allow users to customize resume templates and font styles.
- **Implementation**:
    - Provide a set of pre-defined templates and fonts.
    - Use `react-pdf` for generating PDFs and `react-docx` for DOCX files.
    - Allow users to preview changes in real-time.
- **Example**:
    - **User Interaction**: User selects a new template and sees the resume update accordingly.

---

## Technical Requirements

### Frontend

- **Framework**: React
- **UI Components**: Lucid Icons, Tailwind CSS
- **File Upload Handling**: Custom components using HTML5 and JavaScript APIs
- **State Management**: React Hooks and Context API

### Backend

- **Server Environment**: Node.js
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth for user management
- **API Services**: RESTful APIs for resume handling and analysis requests

### AI Integration

- **Model**: OpenAI GPT-4
- **Endpoints**: Utilize OpenAI's Chat Completions API
- **Data Handling**: Ensure prompts and responses are securely transmitted

### File Parsing Libraries

- **PDF**: `pdf-lib`
- **DOCX**: `docx-parser`
- **TXT**: Plain text handling
- **Others**: Use appropriate parsers as needed

### Styling

- **CSS Framework**: Tailwind CSS
- **Icons**: Lucid Icons
- **Responsive Design**: Ensure compatibility across devices

---

## Architecture Overview

### High-Level Components

1. **User Interface (UI) Layer**
    - Handles all user interactions
    - Components for file upload, resume editor, analysis display, etc.
2. **Business Logic Layer**
    - Processes data between the UI and backend
    - Manages state and application logic
3. **Backend Services**
    - API endpoints for data retrieval and storage
    - Integration with Supabase and OpenAI APIs
4. **Database Layer**
    - Stores user data, resume versions, customization settings

### Data Flow Diagram

```tsx
[User] <---> [Frontend (React)] <---> [Backend API (Node.js)] <---> [Database (Supabase)]
                                    |
                                    +--> [OpenAI GPT-4 API]

```

---

## File Structure

---

## Component Details

### components.tsx

Contains all the UI components used in the application.

### 1. Button Components

- **Description**: Reusable button elements (Primary, Secondary, etc.).
- **Props**:
    - `type`: 'primary' | 'secondary' | 'tertiary'
    - `onClick`: Function to handle click events
    - `disabled`: Boolean to disable the button
- **Example Usage**:
    
    ```jsx
    <Button type="primary" onClick={handleSubmit}>Submit</Button>
    
    ```
    

### 2. Card Components

- **Description**: Used to display content sections like resume previews or analysis results.
- **Props**:
    - `title`: String for the card title
    - `content`: JSX.Element or string
- **Example Usage**:
    
    ```jsx
    <Card title="Resume Preview">
      <ResumePreview data={resumeData} />
    </Card>
    
    ```
    

### 3. FileUpload Component

- **Description**: Handles file uploads and parsing.
- **Props**:
    - `onFileParsed`: Callback function with parsed content
- **Example Usage**:
    
    ```jsx
    <FileUpload onFileParsed={handleFileContent} />
    
    ```
    

### 4. ResumeEditor Component

- **Description**: Allows users to edit and customize their resumes.
- **Props**:
    - `resumeData`: Object containing resume content
    - `onSave`: Function to save changes
- **Example Usage**:
    
    ```jsx
    <ResumeEditor resumeData={currentResume} onSave={saveResumeChanges} />
    
    ```
    

### 5. JobDescriptionAnalyzer Component

- **Description**: Displays the analysis of the job description and resume match score.
- **Props**:
    - `analysisData`: Object containing analysis results
- **Example Usage**:
    
    ```jsx
    <JobDescriptionAnalyzer analysisData={analysisResults} />
    
    ```
    

---

## Services and API Integrations

### services.ts

Contains all service-related functions, including API calls and data processing.

### 1. OpenAI Services

- **Function**: `analyzeJobDescription(description: string)`
    - **Description**: Calls OpenAI API to analyze the job description.
    - **Returns**: Promise resolving to an object with extracted skills and requirements.
- **Function**: `matchResumeToJob(resume: string, jobDescription: string)`
    - **Description**: Compares resume with job description and returns a match score.
    - **Returns**: Promise resolving to a score and feedback.

### 2. Supabase Services

- **Function**: `saveResume(userId: string, resumeData: object)`
    - **Description**: Saves or updates a user's resume in the database.
- **Function**: `getResumes(userId: string)`
    - **Description**: Retrieves all resumes associated with a user.
- **Function**: `deleteResume(userId: string, resumeId: string)`
    - **Description**: Deletes a specific resume version.

### 3. File Parsing Functions

- **Function**: `parseFile(file: File)`
    - **Description**: Determines file type and uses appropriate parser.
    - **Returns**: Parsed text content of the resume.
- **Example**:
    
    ```tsx
    const fileContent = await parseFile(uploadedFile);
    
    ```
    

---

## Utilities

### utils.ts

Contains helper functions and constants used throughout the application.

### 1. Validation Schemas

- **Description**: Schemas for validating user inputs using Zod or a similar library.
- **Example**:
    
    ```tsx
    const ResumeSchema = z.object({
      name: z.string(),
      email: z.string().email(),
      experience: z.array(z.object({
        company: z.string(),
        role: z.string(),
        duration: z.string(),
      })),
    });
    
    ```
    

### 2. Helper Functions

- **Function**: `formatDate(date: Date)`
    - **Description**: Formats a Date object into a readable string.
- **Function**: `calculateMatchScore(analysisData: object)`
    - **Description**: Computes the match score based on analysis results.

---

## API Documentation

### OpenAI Integration

- **Endpoint**: OpenAI Chat Completions API
- **Models Used**: `gpt-4`
- **Usage**:
    - **Request**: Send a prompt with the job description or resume content.
    - **Response**: Receive structured data with skills, requirements, and suggestions.

### Request Example

```json
{
  "model": "gpt-4",
  "messages": [
    {
      "role": "system",
      "content": "You are an expert at analyzing job descriptions..."
    },
    {
      "role": "user",
      "content": "Analyze the following job description..."
    }
  ]
}

```

### Response Example

```json
{
  "skills": ["TypeScript", "React", "Node.js"],
  "requirements": ["3+ years experience", "Bachelor's degree in CS"]
}

```

### Supabase API

- **Authentication**: Uses Supabase Auth for user sessions.
- **Endpoints**:
    - `POST /resumes`: Save a new resume.
    - `GET /resumes`: Retrieve user's resumes.
    - `DELETE /resumes/:id`: Delete a resume.

---

## User Interface Design

### Layout and Navigation

- **Header**: Contains logo and navigation links (Home, My Resumes, Settings, Logout).
- **Sidebar** (if applicable): Quick access to different functionalities.
- **Main Content Area**: Displays the primary content based on user interaction.

### Pages and Components

1. **Home Page (`page.tsx`)**
    - Introduction to the application.
    - Prompt to upload a resume or analyze a job description.
2. **Resume Upload and Editor**
    - FileUpload component for uploading resumes.
    - ResumeEditor for editing and customizing resumes.
3. **Job Description Analysis**
    - Text area for users to paste job descriptions.
    - Display analysis results using JobDescriptionAnalyzer.
4. **Resume Matching Results**
    - Display match score and suggestions.
    - Option to incorporate suggestions into the resume.
5. **My Resumes Page**
    - List of saved resume versions.
    - Options to view, edit, or delete resumes.

### Styling Guidelines

- **Color Scheme**: Professional and neutral colors (e.g., blues, grays).
- **Typography**: Clear and readable fonts.
- **Icons**: Use Lucid Icons for visual cues.
- **Responsive Design**: Ensure functionality on mobile and desktop devices.

---

## User Flows

### 1. New User Onboarding

- **Step 1**: User visits the home page.
- **Step 2**: Prompted to sign up or log in.
- **Step 3**: After authentication, guided through uploading their first resume.
- **Step 4**: Option to analyze a job description.

### 2. Resume Upload and Analysis

- **Step 1**: User uploads a resume file.
- **Step 2**: File is parsed, and content is displayed in the ResumeEditor.
- **Step 3**: User inputs a job description for analysis.
- **Step 4**: Application displays match score and suggestions.
- **Step 5**: User edits resume based on suggestions.

### 3. Saving and Managing Resumes

- **Step 1**: User saves the edited resume.
- **Step 2**: Resume is stored in Supabase under the user's account.
- **Step 3**: User can view all saved resumes in "My Resumes" page.
- **Step 4**: Options to edit or delete existing resumes.

---

## Data Models

### User

- **Fields**:
    - `id`: Unique identifier
    - `email`: User's email address
    - `password`: Hashed password (handled by Supabase Auth)
    - `created_at`: Timestamp

### Resume

- **Fields**:
    - `id`: Unique identifier
    - `user_id`: References the User
    - `content`: Text content of the resume
    - `template`: Selected template/style
    - `created_at`: Timestamp
    - `updated_at`: Timestamp

### AnalysisResult

- **Fields**:
    - `id`: Unique identifier
    - `user_id`: References the User
    - `resume_id`: References the Resume
    - `job_description`: Text of the analyzed job description
    - `match_score`: Numeric score
    - `suggestions`: Textual suggestions
    - `created_at`: Timestamp

---

## External Dependencies

- **OpenAI GPT-4 API**: For AI-driven analysis.
- **Supabase**: Backend services including database and authentication.
- **File Parsing Libraries**:
    - `pdf-lib`: For PDF files.
    - `docx-parser`: For DOCX files.
- **React Libraries**:
    - `react-pdf`: For generating PDFs.
    - `react-docx`: For generating DOCX files.

---

## Testing and Quality Assurance

### Testing Strategies

- **Unit Tests**: For utility functions and components.
- **Integration Tests**: Ensure proper interaction between frontend and backend services.
- **End-to-End Tests**: Simulate user interactions using tools like Cypress.
- **Performance Tests**: Assess response times for AI analysis and data retrieval.

### Quality Assurance

- **Code Reviews**: Peer review all code before merging.
- **Linting and Formatting**: Use ESLint and Prettier for code consistency.
- **Continuous Integration**: Set up CI/CD pipeline for automated testing and deployment.

---

## Deployment

### Environment Setup

- **Development**: Local environment with `.env.local` for environment variables.
- **Staging**: For testing in an environment similar to production.
- **Production**: Live application accessible to users.

### Deployment Platforms

- **Frontend**: Deployed on platforms like Vercel or Netlify.
- **Backend**: Node.js server deployed on services like Heroku or AWS Elastic Beanstalk.
- **Database**: Supabase handles hosting and scaling.

---

## Documentation

### Developer Guide (`documentation/Developer_Guide.md`)

- **Setup Instructions**:
    - Cloning the repository.
    - Installing dependencies with `npm install`.
    - Running the application locally with `npm run dev`.
- **Contribution Guidelines**:
    - Branching strategy.
    - Commit message conventions.
    - Pull request procedures.
- **Code Standards**:
    - Naming conventions.
    - Commenting and documentation practices.

### API Documentation (`documentation/API_Documentation.md`)

- **Endpoints**:
    - List of all API endpoints with descriptions.
    - Request and response schemas.
- **Authentication**:
    - How to handle user sessions.
- **Error Handling**:
    - Common error codes and their meanings.

### Component Guide (`documentation/Component_Guide.md`)

- **UI Components**:
    - Detailed descriptions of props and state management.
- **Example Usages**:
    - Code snippets showing how to use each component.
- **Styling**:
    - Guidelines for customizing component styles.

---

## Security Considerations

- **Data Protection**:
    - Encrypt sensitive data in transit and at rest.
    - Use HTTPS for all communications.
- **Authentication**:
    - Implement secure authentication flows with Supabase Auth.
    - Protect API endpoints with proper authorization checks.
- **Input Validation**:
    - Sanitize and validate all user inputs to prevent injections.
- **API Keys**:
    - Store API keys and secrets in environment variables, not in source code.

---

## Timeline and Milestones

1. **Week 1-2**: Setup project structure, configure development environment, and implement user authentication.
2. **Week 3-4**: Develop core components (FileUpload, ResumeEditor), and integrate file parsing.
3. **Week 5-6**: Implement OpenAI API integration for job description analysis and resume matching.
4. **Week 7-8**: Build resume customization features and template selection.
5. **Week 9**: Testing, bug fixing, and performance optimization.
6. **Week 10**: Prepare documentation, finalize deployment configurations, and launch the application.

---

## Conclusion

This PRD outlines the detailed requirements and specifications for developing the resume optimization web application. By adhering to this document, developers should have clear guidance on the project scope, architecture, and implementation strategies, ensuring a cohesive and efficient development process.

---

**Note to Developers**: Please refer to the respective documentation files for in-depth explanations of components, services, and APIs. For any questions or clarifications, feel free to reach out to the project manager or lead developer.