import { Pipe, PipeTransform } from '@angular/core';
import {Publication} from './publication.model';

@Pipe({ name: 'appFilter' })
export class FilterPipe implements PipeTransform {

  transform(publications: Publication[], searchText: string): Publication[] {
    if (!publications) {
      return [];
    }
    if (!searchText) {
      return publications;
    }
    searchText = searchText.toLocaleLowerCase().trim();

    return publications.filter((pub) => {
      if (pub.title.toLocaleLowerCase().includes(searchText)) {
        return pub.title.toLocaleLowerCase().includes(searchText) ;
      }
      if (pub.user.firstName.toLocaleLowerCase().includes(searchText)) {
        return pub.user.firstName.toLocaleLowerCase().includes(searchText);
      }
      if (pub.description.toLocaleLowerCase().includes(searchText)) {
        return pub.description.toLocaleLowerCase().includes(searchText);
      }
      if (pub.profile.type.type.toLocaleLowerCase().includes(searchText)) {
        return pub.profile.type.type.toLocaleLowerCase().includes(searchText);
      }
      if (pub.action.actions.toLocaleLowerCase().includes(searchText)) {
        return pub.action.actions.toLocaleLowerCase().includes(searchText);
      }
      if (pub.publicCible.name.toLocaleLowerCase().includes(searchText)) {
        return pub.publicCible.name.toLocaleLowerCase().includes(searchText);
      }
    });
  }
}
