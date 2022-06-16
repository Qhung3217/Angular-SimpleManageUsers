import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'count',
})
export class CountPipe implements PipeTransform {
  transform(values: [], filterMetadata): [] {
    filterMetadata.count = values.length;
    return values;
  }
}
