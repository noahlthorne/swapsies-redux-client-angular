import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { map } from 'rxjs/operators';
import { Swap } from 'src/app/models/Swap.model';
import { Subject } from 'rxjs';

const SERVER_URL = environment.apiUrl;

@Injectable({
  providedIn: 'root',
})
export class SwapService {
  private swaps: Swap[] = [];
  private swapsUpdated = new Subject<Swap[]>();
  constructor(private http: HttpClient) {}

  addSwap(listingRequestedId: string, listingOfferedId: string) {
    const addSwapUrl: string = `${SERVER_URL}/swaps`;
    const swapData = {
      listingRequested: listingRequestedId,
      listingOffered: listingOfferedId,
    };

    this.http
      .post<{ swap: any }>(addSwapUrl, swapData)
      .subscribe((response) => {
        console.log(response);
      });
  }

  getListingsSwaps(listingId: string) {
    const listingsSwapsUrl = `${SERVER_URL}/listings/${listingId}/swaps`;
    return this.http
      .get<{ swaps: any }>(listingsSwapsUrl)
      .pipe(
        map((swapsData) => {
          return swapsData.swaps.map((swap: any) => {
            return {
              ...swap,
              id: swap._id,
            };
          });
        })
      )
      .subscribe((transformedSwaps) => {
        this.swaps = transformedSwaps;
        this.swapsUpdated.next([...this.swaps]);
      });
  }

  getSwapsUpdateListener = () => {
    return this.swapsUpdated.asObservable();
  };
}
