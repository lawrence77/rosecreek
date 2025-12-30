import { InquiryCategory } from '@rosecreek/inquiry-model';

export const Questionnaire: InquiryCategory[] = [
  {
    title: 'Contact Information',
    questions: [
      {
        alias: 'name',
        question: 'What is your name?',
        responseType: 'string',
      },
      {
        alias: 'email',
        question: 'What is your email?',
        responseType: 'string',
      },
      {
        alias: 'phone',
        question: 'What is your phone number?',
        responseType: 'string',
      },
    ],
  },
  {
    title: 'Puppy Questions',
    questions: [
      {
        alias: 'gender',
        question: 'Would you rather have a male or female puppy?',
        responseType: 'string',
      },
      {
        alias: 'whyGolden',
        question:
          'Why do you want a Golden Retriever? Why is this breed right for you?',
        responseType: 'string',
      },
      {
        alias: 'puppyExperience',
        question: 'What experiences do you have with owning a puppy or dogs?',
        responseType: 'string',
      },

      {
        alias: 'classes',
        question:
          'Puppies will need socialization and one-to-two obedience classes at a minimum. Please describe your plans to train and socialize your puppy.',
        responseType: 'string',
      },
      {
        alias: 'personality',
        question:
          'What kind of personality or specific traits are you looking for in your new dog? Please be specific about energy level, drive, self-confidence, dominance/submission, learning style, intelligence, appearance, professional cuddler, natural prey drive, and anything else that is important to you in your dog.',
        responseType: 'string',
      },
      {
        alias: 'puppyStability',
        question:
          'Is there another home that the puppy will visit or stay frequently? If so, where is it located? Tell us about it.',
        responseType: 'string',
      },
      {
        alias: 'otherPets',
        question:
          'Do you own any other pets? If so, please tell us about them. What kinds are they? What are their breeds, sexes, and ages? Are they spayed/neutered? How do you think they will react to a new puppy?',
        responseType: 'string',
      },
    ],
  },
  {
    title: 'Household Lifestyle',
    questions: [
      {
        alias: 'familyLifestyle',
        question:
          "Please list all the people in your household including you, their ages and their occupations. Please describe your family's lifestyle as well.",
        responseType: 'string',
      },
      {
        alias: 'workLife',
        question:
          'What does a typical workday look like for you? How many hours is a typical work day? Will you be able to go home for lunch to let the puppy out?',
        responseType: 'string',
      },
      {
        alias: 'exercise',
        question:
          'How much exercise do you plan to give your dog(s) each day? How will you exercise your dog(s)?',
        responseType: 'string',
      },
      {
        alias: 'travel',
        question:
          'How much traveling do you plan to do without your dog(s) during the year?',
        responseType: 'string',
      },
      {
        alias: 'arrangements',
        question:
          'What arrangements will you make for your dog when you travel?',
        responseType: 'string',
      },
    ],
  },
  {
    title: 'Responsibilities and Environment',
    questions: [
      {
        alias: 'allergies',
        question: 'Does anyone in your household suffer from dog allergies?',
        responseType: 'boolean',
      },
      {
        alias: 'primaryCaregiver',
        question:
          "Who will be the primary caregiver for the puppy? Who else will be responsible for the dog's care?",
        responseType: 'string',
      },
      {
        alias: 'homeOwnership',
        question: 'Do you own or rent your home?',
        responseType: 'string',
      },
      {
        alias: 'rentalPermission',
        question:
          'If you rent, do you have permission from your landlord to have a Golden Retriever?',
        responseType: 'boolean',
      },
      {
        alias: 'fencedYard',
        question:
          'Do you have a fully fenced yard? Is it dog proof? What kind of fencing and how tall? Do you have a pool? (Please be sure you can block off the pool when the puppy is young!)',
        responseType: 'string',
      },
    ],
  },

  {
    title: 'Priority',
    questions: [
      {
        alias: 'soleBreeder',
        question: 'Are you on any other breeders list?',
        responseType: 'boolean',
      },
      {
        alias: 'timeline',
        question:
          'When are you hoping to get a puppy? Do you have a specific timeframe in mind? Keep in mind that we only have a few litters per year, so we may not be able to accommodate all requests.',
        responseType: 'string',
      },
      {
        alias: 'showing',
        question:
          'Are you interested in potentially showing your new puppy at AKC events?',
        responseType: 'boolean',
      },
      {
        alias: 'nonBreedingAgreement',
        question:
          'All of our dogs are sold on AKC non-breeding agreement or co-ownership. These limitations are only lifted if certain conditions are met. Please let us know if you have any questions or concerns about this requirement below.',
        responseType: 'string',
      },
    ],
  },
  {
    title: 'Outreach',
    questions: [
      {
        alias: 'marketing',
        question: 'How did you hear about us?',
        responseType: 'string',
      },
      {
        alias: 'facebookGroup',
        question:
          'We like to have an active Facebook page to help answer questions and keep in touch with all of our puppy buyers. Would you be willing to join our Facebook group? If not, please tell us how you would prefer to keep in touch.',
        responseType: 'string',
      },
    ],
  },
  {
    title: 'Additional Comments',
    questions: [
      {
        alias: 'additionalComments',
        question:
          'Is there anything else you would like to tell us about yourself, your family, or your plans for a new puppy?',
        responseType: 'string',
      },
    ],
  },
];
