import {
  AfterContentInit,
  Component,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Galleria } from 'primeng/galleria';

@Component({
  selector: 'app-gallery',
  template: `
    <p-galleria
      #galleria
      [(value)]="images"
      [(activeIndex)]="activeIndex"
      [numVisible]="5"
      [containerStyle]="{ 'max-width': '100%' }"
      [containerClass]="galleriaClass()"
      [showThumbnails]="showThumbnails"
      [showItemNavigators]="true"
      [showItemNavigatorsOnHover]="true"
      [circular]="true"
      [autoPlay]="true"
      [transitionInterval]="3000"
    >
      <ng-template pTemplate="item" let-item>
        <img
          [src]="item.previewImageSrc"
          [ngStyle]="{
            width: !fullscreen ? '100%' : '',
            display: !fullscreen ? 'block' : ''
          }"
        />
      </ng-template>
      <ng-template pTemplate="thumbnail" let-item>
        <div class="p-grid p-nogutter p-justify-center">
          <img [src]="item.thumbnailImageSrc" />
        </div>
      </ng-template>
      <ng-template pTemplate="footer" let-item>
        <div
          class="custom-galleria-footer d-flex justify-content-between self-align-item align-item-center"
          style="background-color: black;"
        >
          <button
            type="button"
            pButton
            icon="pi pi-list"
            (click)="onThumbnailButtonClick()"
            style="background-color: black; border-color: black"
          ></button>
          <span *ngIf="images" class="title-container" style="color: white;">
            <span style="font-size: 25px"
              >{{ activeIndex + 1 }}/{{ images.length }}</span
            >
            <!-- <span class="title">{{ images[activeIndex].title }}</span> -->
            <!-- <span>{{ images[activeIndex].alt }}</span> -->
          </span>
          <button
            type="button"
            pButton
            [icon]="fullScreenIcon()"
            (click)="toggleFullScreen()"
            class="fullscreen-button"
            style="background-color: black; border-color: black"
          ></button>
        </div>
      </ng-template>
    </p-galleria>
    <div style="height: 20px;"></div>
  `,
  styles: [
    `
      :host .custom-galleria.p-galleria.fullscreen {
        display: flex;
        flex-direction: column;
      }

      :host .custom-galleria.p-galleria.fullscreen .p-galleria-content {
        flex-grow: 1;
        justify-content: center;
      }

      :host .custom-galleria.p-galleria .p-galleria-content {
        position: relative;
      }

      :host .custom-galleria.p-galleria .p-galleria-thumbnail-wrapper {
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
      }

      :host .custom-galleria.p-galleria .p-galleria-thumbnail-items-container {
        width: 100%;
      }

      :host .custom-galleria.p-galleria .custom-galleria-footer {
        display: flex;
        align-items: center;
        background-color: rgba(0, 0, 0, 0.9);
        color: #ffffff;
      }

      :host .custom-galleria.p-galleria .custom-galleria-footer button {
        background-color: transparent;
        color: #ffffff;
        border: 0 none;
        border-radius: 0;
        margin: 0.2rem 0;
      }

      :host
        .custom-galleria.p-galleria
        .custom-galleria-footer
        button.fullscreen-button {
        margin-left: auto;
      }

      :host .custom-galleria.p-galleria .custom-galleria-footer button:hover {
        background-color: rgba(255, 255, 255, 0.1);
      }

      :host .custom-galleria.p-galleria .title-container span {
        font-size: 0.9rem;
        padding-left: 0.829rem;
      }

      :host .custom-galleria.p-galleria .title-container span.title {
        font-weight: bold;
      }
    `,
  ],
})
export class GalleryComponent implements OnInit {
  @Input() currentHome: any;
  images: {
    previewImageSrc: string;
    thumbnailImageSrc: string;
    alt: string;
    title: string;
  }[] = [];

  responsiveOptions: any[] = [
    {
      breakpoint: '1024px',
      numVisible: 5,
    },
    {
      breakpoint: '768px',
      numVisible: 3,
    },
    {
      breakpoint: '560px',
      numVisible: 1,
    },
  ];

  showThumbnails: boolean = false;

  fullscreen: boolean = false;

  activeIndex: number = 0;

  onFullScreenListener: any;

  @ViewChild('galleria') galleria!: Galleria;

  public images_: any;

  ngOnInit(): void {
    this.images_ = this.currentHome;
    console.log(this.images_);

    // Ajouter chaque image au tableau 'images'
    this.currentHome.images.forEach((image: string, index: number) => {
      this.images.push({
        previewImageSrc: image,
        thumbnailImageSrc: image, // Vous pouvez ajuster cela en fonction de vos besoins
        alt: `Description for Image ${index + 1}`,
        title: `Title ${index + 1}`,
      });
    });

    console.log('Voici les image', this.images);
    this.bindDocumentListeners();
  }

  onThumbnailButtonClick() {
    this.showThumbnails = !this.showThumbnails;
  }

  toggleFullScreen() {
    if (this.fullscreen) {
      this.closePreviewFullScreen();
    } else {
      this.openPreviewFullScreen();
    }
  }

  openPreviewFullScreen() {
    let elem = this.galleria.element.nativeElement.querySelector('.p-galleria');
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem['mozRequestFullScreen']) {
      /* Firefox */
      elem['mozRequestFullScreen']();
    } else if (elem['webkitRequestFullscreen']) {
      /* Chrome, Safari & Opera */
      elem['webkitRequestFullscreen']();
    } else if (elem['msRequestFullscreen']) {
      /* IE/Edge */
      elem['msRequestFullscreen']();
    }
  }

  onFullScreenChange() {
    this.fullscreen = !this.fullscreen;
  }
  // ... other code ...

  closePreviewFullScreen() {
    if ((document as any).exitFullscreen) {
      (document as any).exitFullscreen();
    } else if ((document as any)['mozCancelFullScreen']) {
      /* Firefox */
      (document as any)['mozCancelFullScreen']();
    } else if ((document as any)['webkitExitFullscreen']) {
      /* Chrome, Safari & Opera */
      (document as any)['webkitExitFullscreen']();
    } else if ((document as any)['msExitFullscreen']) {
      /* IE/Edge */
      (document as any)['msExitFullscreen']();
    }
  }

  // ... other code ...

  bindDocumentListeners() {
    this.onFullScreenListener = this.onFullScreenChange.bind(this);
    document.addEventListener('fullscreenchange', this.onFullScreenListener);
    document.addEventListener('mozfullscreenchange', this.onFullScreenListener);
    document.addEventListener(
      'webkitfullscreenchange',
      this.onFullScreenListener
    );
    document.addEventListener('msfullscreenchange', this.onFullScreenListener);
  }

  unbindDocumentListeners() {
    document.removeEventListener('fullscreenchange', this.onFullScreenListener);
    document.removeEventListener(
      'mozfullscreenchange',
      this.onFullScreenListener
    );
    document.removeEventListener(
      'webkitfullscreenchange',
      this.onFullScreenListener
    );
    document.removeEventListener(
      'msfullscreenchange',
      this.onFullScreenListener
    );
    this.onFullScreenListener = null;
  }

  ngOnDestroy() {
    this.unbindDocumentListeners();
  }

  galleriaClass() {
    return `custom-galleria ${this.fullscreen ? 'fullscreen' : ''}`;
  }

  fullScreenIcon() {
    return `pi ${
      this.fullscreen ? 'pi-window-minimize' : 'pi-window-maximize'
    }`;
  }
}
