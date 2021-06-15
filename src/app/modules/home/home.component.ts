import { Component, Inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { L10N_LOCALE, L10nLocale, L10nTranslationService } from 'angular-l10n';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SwiperOptions } from 'swiper';
import { SwiperComponent } from 'swiper/types/shared';
import { Subject } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';

import { QuestionInterface } from './models/question.interface';
import { ExperienceInterface } from './models/experience.interface';
import { specialtyOptions } from './configs/specialtyOptions';
import { ReviewInterface } from './models/review.interface';
import { FormsService } from '../shared/services/forms/forms.service';
import { SubmitConsultationResultComponent } from './components/submit-consultation-result/submit-consultation-result.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  @ViewChild('componentRef') componentRef?: SwiperComponent;

  private unsubscribe: Subject<void> = new Subject();

  ownerProjects: string[];
  ownerExperience: ExperienceInterface[];
  questions: QuestionInterface[];
  consultationForm: FormGroup;
  specialtyOptions = specialtyOptions;
  specialtyFormDisabled = false;
  reviews: ReviewInterface[];
  reviewsSliderConfig: SwiperOptions = {
    a11y: { enabled: true },
    direction: 'horizontal',
    slidesPerView: 1,
  };
  reviewsCurrentSlide = 0;

  constructor(
    @Inject(L10N_LOCALE) public locale: L10nLocale,
    private translation: L10nTranslationService,
    private formBuilder: FormBuilder,
    private formsService: FormsService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.createConsultationForm();
    this.translation.onChange().pipe(
      takeUntil(this.unsubscribe),
    ).subscribe({
      next: () => {
        this.ownerProjects = this.translation.translate('home.owner.projects');
        this.ownerExperience = this.translation.translate('home.owner.experience');
        this.questions = this.translation.translate('home.faq.questions');
        this.reviews = this.translation.translate('home.reviews.list');
      }
    });
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  createConsultationForm(): void {
    this.consultationForm = this.formBuilder.group({
      name: '',
      phone: '',
      email: '',
      specialty: '',
    });
  }

  toggleQuestion(questionIndex: number): void {
    this.questions = this.questions.map((question: QuestionInterface, index: number) => ({
      ...question,
      isOpen: index === questionIndex ? !question.isOpen : false
    }));
  }

  prevReview(): void {
    if (this.reviewsCurrentSlide > 0) {
      this.reviewsCurrentSlide--;
    } else {
      this.reviewsCurrentSlide = this.reviews.length - 1;
    }
  }

  nextReview(): void {
    if (this.reviewsCurrentSlide < this.reviews.length - 1) {
      this.reviewsCurrentSlide++;
    } else {
      this.reviewsCurrentSlide = 0;
    }
  }

  submitConsultationForm(): void {
    this.specialtyFormDisabled = true;

    this.formsService.sendForm('xrgrkgld', this.consultationForm.value).pipe(
      take(1)
    ).subscribe(res => {
      console.log('res ', res);
      this.createConsultationForm();
      this.dialog.open(SubmitConsultationResultComponent, {
        width: '1000px',
      });
    }, error => {
      console.log('error ', error);
    }, () => {
      this.specialtyFormDisabled = false;
    });
  }
}
