import {Component, OnInit} from '@angular/core';

import { Movie } from '../../../../models/index';
import { MoviesService } from '../../../../services/index';

import 'style-loader!./movies.scss';

@Component({
  selector: 'movies',
  styleUrls: ['./movies.scss'],
  templateUrl: './movies.html'
})
export class MoviesListComponent implements OnInit {
  popularList: Array<Object>;
  topRatedList: Array<Object>;

  constructor(private _moviesService: MoviesService) {
    this._moviesService.getPopular().subscribe(res => {
      this.popularList = res.results;
    });

    this._moviesService.getTopRatedMovies().subscribe(res => {
      this.topRatedList = res.results;
    });
  }

  ngOnInit() {
  }

}
