import { Pipe, PipeTransform } from '@angular/core';
import { User } from '../users/user.model';

@Pipe({
  name: 'filterStatus',
  // pure: true,
})
export class FilterStatusPipe implements PipeTransform {
  transform(values: User[], sample: string) {
    let condition: boolean;
    switch (sample) {
      case 'activated':
        condition = true;
        break;
      case 'suspended':
        condition = false;
        break;
      default:
        return values;
    }
    const result = values.filter((value) => value.status === condition);
    // console.log(result, condition, sample);
    return result;
  }
}
