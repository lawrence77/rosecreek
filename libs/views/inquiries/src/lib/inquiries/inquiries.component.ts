import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '@rosecreek/ui';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { SubmitInquiryService } from '@rosecreek/submit-inquiry';
import { Questionnaire } from '@rosecreek/submit-inquiry'; // Adjust path if needed, e.g. '../path/to/questionnaire'

@Component({
  selector: 'lib-inquiries',
  standalone: true,
  imports: [CommonModule, HeaderComponent, ReactiveFormsModule],
  templateUrl: './inquiries.component.html',
  styleUrl: './inquiries.component.css',
})
export class InquiriesComponent implements OnInit {
  inquiryForm!: FormGroup;
  submissionMessage = '';
  isSubmitting = false;
  questionnaire = Questionnaire; // The full questionnaire data

  constructor(
    private formBuilder: FormBuilder,
    private inquiryService: SubmitInquiryService
  ) {}

  ngOnInit(): void {
    // Build the form dynamically based on the questionnaire
    const formControls: { [key: string]: any } = {};

    this.questionnaire.forEach((category) => {
      category.questions.forEach((q) => {
        const validators = [];
        // Make contact info and most text fields required
        if (
          [
            'name',
            'email',
            'phone',
            'whyGolden',
            'puppyExperience',
            'classes',
            'personality',
            'familyLifestyle',
            'workLife',
            'exercise',
            'primaryCaregiver',
            'timeline',
          ].includes(q.alias)
        ) {
          validators.push(Validators.required);
        }
        // Email specific validator
        if (q.alias === 'email') {
          validators.push(Validators.email);
        }

        if (q.responseType === 'boolean') {
          formControls[q.alias] = [false];
        } else {
          formControls[q.alias] = ['', validators];
        }
      });
    });

    this.inquiryForm = this.formBuilder.group(formControls);
  }

  onSubmit(): void {
    if (this.inquiryForm.valid) {
      this.isSubmitting = true;
      this.submissionMessage = '';

      // The form value will have all answers keyed by alias
      this.inquiryService.submitInquiry(this.inquiryForm.value).subscribe({
        next: (response: unknown) => {
          this.submissionMessage =
            'Thank you! Your puppy application has been submitted successfully. We will review it and get back to you soon.';
          this.inquiryForm.reset();
          this.isSubmitting = false;
          console.log('Inquiry submitted:', response);
        },
        error: (error: unknown) => {
          this.submissionMessage =
            'There was an error submitting your application. Please try again later.';
          this.isSubmitting = false;
          console.error('Submission error:', error);
        },
      });
    } else {
      this.submissionMessage = 'Please complete all required fields.';
      this.inquiryForm.markAllAsTouched();
    }
  }
}
