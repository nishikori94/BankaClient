import { Component, OnInit } from '@angular/core';
import { HomeService } from '../home.service';
import { ActivatedRoute } from '@angular/router';
import { Uplata } from '../model/Uplata';
import { Transakcija } from '../model/Transakcija';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  paymentUrl: string;
  paymentId: string;
  uplata: Uplata;

  vlasnik: string;
  mesecIsteka: string;
  godinaIsteka: string;
  sigurnosniBroj: string;
  brojKartice: string;

  transakcija: Transakcija = {
    pan: "",
    sigurnosniKod: "",
    nazivVlasnikaKartice: "",
    datumVazenja: new Date(),
    iznos: "",
    acquirerOrderId: "",
    acquirerTimestamp: "",
    uplataId: 0,
    acquirerSwiftCode: ""
  };
  
  constructor(private homeService: HomeService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.paymentUrl = params.get('paymentUrl'); // (+) converts string 'id' to a number
      this.paymentId = params.get('paymentId');
      this.homeService.proveriUrl(this.paymentUrl, this.paymentId).subscribe(
        data => {
          this.uplata = data;
        }
      )
    });
  }

  posaljiTransakciju(){

    this.transakcija.datumVazenja.setFullYear(Number(this.godinaIsteka));
    this.transakcija.datumVazenja.setMonth(Number(this.mesecIsteka) - 1);

    this.transakcija.iznos = this.uplata.amount.toString();
    this.transakcija.uplataId = this.uplata.uplataId;

    this.transakcija.pan = this.brojKartice;
    this.transakcija.sigurnosniKod = this.sigurnosniBroj;

    this.homeService.posaljiTransakciju(this.transakcija).subscribe( data => {

    });
    
  }

}
