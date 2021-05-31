import { AfterViewInit, Component, Inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { L10N_LOCALE, L10nLocale, L10nTranslationService } from 'angular-l10n';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SwiperOptions } from 'swiper';

import { QuestionInterface } from './models/question.interface';
import { ExperienceInterface } from './models/experience.interface';
import { specialtyOptions } from './configs/specialtyOptions';
import { SwiperComponent } from 'swiper/types/shared';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  @ViewChild('componentRef') componentRef?: SwiperComponent;

  ownerProjects: string[];
  ownerExperience: ExperienceInterface[];
  questions: QuestionInterface[];
  consultationForm: FormGroup;
  specialtyOptions = specialtyOptions;
  reviewsSliderConfig: SwiperOptions = {
    a11y: { enabled: true },
    direction: 'horizontal',
    slidesPerView: 1,
  };
  reviewsCurrentSlide = 0;

  constructor(
    @Inject(L10N_LOCALE) public locale: L10nLocale,
    private translation: L10nTranslationService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.createConsultationForm();
    this.translation.onChange().subscribe({
      next: () => {
        this.ownerProjects = this.translation.translate('home.owner.projects');
        this.ownerExperience = this.translation.translate('home.owner.experience');
        this.questions = this.translation.translate('home.faq.questions');
      }
    });
  }

  createConsultationForm(): void {
    this.consultationForm = this.formBuilder.group({
      name: '',
      phone: '',
      email: '',
      specialty: '',
    });
  }

  submitConsultationForm(): void {
    console.log('this.consultationForm ', this.consultationForm.value);
    this.createConsultationForm();
  }

  ngOnDestroy(): void {
  }

  toggleQuestion(questionIndex: number): void {
    this.questions = this.questions.map((question: QuestionInterface, index: number) => ({
      ...question,
      isOpen: index === questionIndex ? !question.isOpen : false
    }));
  }

  nextReview(): void {
    if (this.reviewsCurrentSlide < 4) {
      this.reviewsCurrentSlide++;
    } else {
      this.reviewsCurrentSlide = 0;
    }
  }
}
