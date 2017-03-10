import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'userRole'
})
export class UserRolePipe implements PipeTransform {

  transform(value: number): string {
    let result:string = '';

    switch (value) {
      case 1:
        result = 'User';
        break;

      case 2:
        result = 'Admin';
        break;

      default:
        result = 'Unknown role';

        break;
    }

    return result;
  }

}
