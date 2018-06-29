import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {BenimFirsatimLibrary} from '../services/benimFirsatimLibrary';
import {
  dealAvatarSelectionTrigger,
  highlightTrigger,
  loadingBlackDivAnimationTrigger,
  showMeTrigger
} from '../animations';
import {MatDatepickerInputEvent, MatSnackBar, MatSnackBarConfig} from '@angular/material';
import {NgForm} from '@angular/forms';
import {Router} from '@angular/router';

declare let $: any;
declare let lottie: any;

@Component({
  selector: 'app-create-new-deal',
  templateUrl: './create-new-deal.component.html',
  styleUrls: ['./create-new-deal.component.scss'],
  animations: [showMeTrigger, dealAvatarSelectionTrigger, loadingBlackDivAnimationTrigger, highlightTrigger]
})
export class CreateNewDealComponent implements OnInit, OnDestroy {

  @ViewChild('allCategories') allCategories: any;
  @ViewChild('allImages') allImages: any;

  dealUrlPreview = '';
  dealTitlePreview = '';
  dealPricePreview = '';
  dealDetailPreview = '';
  dealOwner = '';
  dealOwnerAvatar = '';


  currentDate = '';

  createButtonActivated = false;

  images: any[] = [];
  selectedCity: any;

  states = ['Adana', 'Adıyaman', 'Afyon', 'Ağrı', 'Amasya', 'Ankara', 'Antalya', 'Artvin',
    'Aydın', 'Balıkesir', 'Bilecik', 'Bingöl', 'Bitlis', 'Bolu', 'Burdur', 'Bursa', 'Çanakkale',
    'Çankırı', 'Çorum', 'Denizli', 'Diyarbakır', 'Edirne', 'Elazığ', 'Erzincan', 'Erzurum', 'Eskişehir',
    'Gaziantep', 'Giresun', 'Gümüşhane', 'Hakkari', 'Hatay', 'Isparta', 'Mersin', 'İstanbul', 'İzmir',
    'Kars', 'Kastamonu', 'Kayseri', 'Kırklareli', 'Kırşehir', 'Kocaeli', 'Konya', 'Kütahya', 'Malatya',
    'Manisa', 'Kahramanmaraş', 'Mardin', 'Muğla', 'Muş', 'Nevşehir', 'Niğde', 'Ordu', 'Rize', 'Sakarya',
    'Samsun', 'Siirt', 'Sinop', 'Sivas', 'Tekirdağ', 'Tokat', 'Trabzon', 'Tunceli', 'Şanlıurfa', 'Uşak',
    'Van', 'Yozgat', 'Zonguldak', 'Aksaray', 'Bayburt', 'Karaman', 'Kırıkkale', 'Batman', 'Şırnak',
    'Bartın', 'Ardahan', 'Iğdır', 'Yalova', 'Karabük', 'Kilis', 'Osmaniye', 'Düzce'];

  isLinkEmpty = true;

  showProgressBar = false;

  selectedImageSrc = '../../assets/imgs/firsat_gorseli_unselected@3x.png';

  createDealAnimation: any;

  dealReadytoPublish: boolean;

  selectedCategory = -1;
  categories = [];


  constructor(public benimFirsatimlib: BenimFirsatimLibrary,
              public snackBar: MatSnackBar,
              public router: Router) {
  }

  ngOnInit(): void {

    this.createButtonActivated = false;

    this.loadAnimations();
    this.categories = this.benimFirsatimlib.categories;
    $(document).ready(function () {

      $('.bxslider').bxSlider({
        autoControls: true,
        stopAutoOnClick: true,
        speed: 1000,
        slideWidth: 200,
        minSlides: 3,
        maxSlides: 3,
        touchEnabled: false,
        pager: false,
        easing: 'ease-in-out'
      });

      $('.footer').hide();
    });
    this.fillImagesArrayWithDefaultImages();

  }

  ngOnDestroy(): void {
    $('.footer').show();
  }

// it fills the array with default images.
  fillImagesArrayWithDefaultImages(): void {
    for (let i = 0; i < 4; i++) {
      this.images.push('../../assets/imgs/firsat_gorseli_unselected@3x.png');
    }
  }

  showMe(element): void {

    const arr = this.allCategories.nativeElement.children;
    this.selectedCategory = this.getCategoryId(element.innerText);

    for (let i = 0; i < arr.length; i++) {
      if (arr[i] !== element) {
        arr[i].show = 'notShow';
      }
    }

    if (element.show === 'show') {
      element.show = 'notShow';
    } else {
      element.show = 'show';
    }
  }

  loadAnimations(): void {
    this.createDealAnimation = lottie.loadAnimation({
      container: document.getElementById('createDealAnim'), // the dom element that will contain the animation
      renderer: 'svg',
      loop: false,
      autoplay: false,
      path: 'assets/animations/firsati_yarat.json' // the path to the animation json
    });
  }

  selectMe(element): void {
    this.selectedImageSrc = element.src;
    const arr = this.allImages.nativeElement.children;
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] !== element) {
        arr[i].children[0].select = 'unSelected';
      }
    }

    if (element.select === 'selected') {
      element.select = 'unSelected';
    } else {
      element.select = 'selected';
    }
  }

  concatGivenString(element: string, sliceFrom: number): string {
    if (element.length > sliceFrom) {
      return element.slice(0, sliceFrom).concat('...');
    } else {
      return element;
    }
  }

  playSegments(from, to): void {
    this.createDealAnimation
      .playSegments([from, to], true);
  }

  playAnim(): void {
    this.createDealAnimation.play();
  }

  stopAnim(): void {
    this.createDealAnimation.stop();
  }

  // it replaces title,images,description of deals with given link.
  onUrlChangeWithGivenLink(event): void {
    this.dealUrlPreview = event.target.value;
    if (this.isLinkEmpty) {
      this.showProgressBar = true;

      this.benimFirsatimlib.getPullMeta(event.target.value).subscribe(response => {
        console.log(response);

        if (!response.json().hasOwnProperty('errors') && response.json().best_image != null && response.json().other_images !== []) {
          this.images = [];
          this.images.push(response.json().best_image);
          for (let i = 0; i < response.json().other_images.length; i++) {
            if (this.images.length < 5) {
              this.images.push(response.json().other_images[i][0]);
            }
          }
          this.dealTitlePreview = this.concatGivenString(response.json().title, 68);
          this.dealDetailPreview = this.concatGivenString(response.json().description, 200);
          this.showProgressBar = false;
        } else {
          this.showProgressBar = false;
          this.snackBar.open('Lütfen girdiğiniz linki kontrol edin.', '', {duration: 3000});
        }
      }, error2 => {
        this.showProgressBar = false;
        this.snackBar.open('Lütfen girdiğiniz linki kontrol edin.', '', {duration: 3000});
      });
    }
    this.isLinkEmpty = event.target.value === '';
  }


  events: string[] = [];

  addEvent(type: string, event: MatDatepickerInputEvent<Date>): void {
    this.events.push(`${type}: ${event.value}`);
  }

  onPriceChange(event): void {
    this.dealPricePreview = event.target.value;
  }

  onTitleChange(event): void {
    this.dealTitlePreview = event.target.value;
  }

  onDetailChange(event): void {
    this.dealDetailPreview = event.target.value;
  }

  onSubmit(form: NgForm, dealUrl, dealDetail, dealPrice, baslangicTarihi, dealTitle, dealImageContainer, lsd): void {
    this.dealReadytoPublish = true;

    if (this.selectedCategory === undefined || this.selectedCategory === -1) {
      lsd.highlight = 'highlighted';
      this.dealReadytoPublish = false;
    } else {
      lsd.highlight = 'none';
    }

    if (form.value.dealUrlPreview === '') {
      dealUrl.highlight = 'highlighted';
      this.dealReadytoPublish = false;
    } else {
      dealUrl.highlight = 'none';
    }
    if (form.value.dealDetailPreview === '') {
      this.dealReadytoPublish = false;
      dealDetail.highlight = 'highlighted';
    } else {
      dealDetail.highlight = 'none';
    }
    if (form.value.dealPricePreview === '') {
      dealPrice.highlight = 'highlighted';
      this.dealReadytoPublish = false;
    } else {
      dealPrice.highlight = 'none';
    }
    /*if (form.value.dealDate == '' || form.value.dealDate == null) {
        //baslangicTarihi.highlight = 'highlighted';
        //this.dealReadytoPublish = false;
      } else {
        var date = form.value.dealDate.toLocaleDateString().replace('.', '/').replace('.', '/');
        baslangicTarihi.highlight = 'none';
      }*/

    if (form.value.dealTitlePreview === '') {
      dealTitle.highlight = 'highlighted';
      this.dealReadytoPublish = false;
    } else {
      dealTitle.highlight = 'none';
    }

    // Warn if user doesnt select any image for deal.
    if (this.selectedImageSrc === '../../assets/imgs/firsat_gorseli_unselected@3x.png') {
      dealImageContainer.highlight = 'highlighted';
      this.dealReadytoPublish = false;
    } else {
      dealImageContainer.highlight = 'none';
    }
    if (this.dealReadytoPublish) {
      this.createButtonActivated = true;
      form.value.selectedCategory = this.selectedCategory;
      this.benimFirsatimlib.createDeal(form, this.selectedImageSrc, '').subscribe(response => {

        if (response.json().hasOwnProperty('id')) {
          this.benimFirsatimlib.justCreatedDeal = response.json();
          this.router.navigate(['/deal/0']);
        } else {
          this.snackBar.open(response.statusText, '', {duration: 3000});
        }
      }, error => {
        this.snackBar.open(error.toLocaleString(), '', {duration: 3000});
      });
    }
  }

  getCategoryId(name): number {

    switch (name) {
      case 'OFİS & KIRTASİYE':
        return 15;
      case 'MÜZİK':
        return 14;
      case 'OTOMOBİL AKSESUARLARI':
        return 16;
      case 'SAĞLIK & KİŞİSEL BAKIM':
        return 17;
      case 'SPOR & FITNESS':
        return 18;
      case 'TATİL & KAMPÇILIK':
        return 20;
      case 'YAZILIM & OYUN':
        return 21;
      case 'TAKI & AKSESUAR':
        return 19;
      case 'DİĞER':
        return 22;
      case 'AİLE & ÇOCUK':
        return 1;
      case 'BEYAZ EŞYA & EV ALETLERİ':
        return 2;
      case 'BİLGİSAYAR':
        return 3;
      case 'EV & BAHÇE':
        return 8;
      case 'FREEBIES':
        return 10;
      case 'FİNANSAL HİZMETLER':
        return 9;
      case 'GIDA':
        return 11;
      case 'MOBİLYA':
        return 12;
      case 'MODA & TEKSTİL':
        return 13;
      case 'ELEKTRONİK':
        return 7;
      case 'EĞLENCE':
        return 6;
      case 'ÇİN FIRSATLARI':
        return 5;
      case 'CEP TELEFONU':
        return 4;
    }

    return 0;
  }
}
