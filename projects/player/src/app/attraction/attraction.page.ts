import {
  Component,
  OnInit
} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {
  Attraction,
  AttractionService
} from 'cr-lib';
import {Subscription} from 'rxjs';
import {LocLink} from '../../../../cr-lib/src/lib/api/loc-link/loc-link';

@Component({
  selector: 'app-attraction',
  templateUrl: './attraction.page.html',
  styleUrls: ['./attraction.page.scss'],
})
export class AttractionPage implements OnInit {

  public attraction: Attraction;

  private subscription: Subscription;

  constructor(
    private activatedRoute: ActivatedRoute,
    private attractionService: AttractionService,
  ) {
    console.log('AttractionPage is constructing');
  }

  ngOnInit() {
    this.subscription = this.activatedRoute.queryParams.subscribe(
      (params) => {
        const attractionId = parseInt(this.activatedRoute.snapshot.paramMap.get('id'), 10);
        console.log('AttractionPage.ngOnInit; attractionId = ', attractionId);
        this.attraction = this.attractionService.getAttraction(
          attractionId
        );
      });
  }

  openAttractionLink(locLink: LocLink) {
    /* TODO: Invoke the Badge API (SVR-51) here. */
    window.open(
      locLink.link,
      '_system',
      'location=yes'
    );
    return false;
  }

}
