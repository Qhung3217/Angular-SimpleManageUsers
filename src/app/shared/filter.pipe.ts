import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
})
export class FilterPipe implements PipeTransform {
  transform(values: any[], term: any, particularProperty: string[] = []) {
    // console.log(values, term, particularProperty);
    if (!term) return values;
    const result = FilterPipe.filter(values, term, particularProperty);
    // console.log('result', result);
    return result;
  }
  private static filter(
    values: any[],
    term: string,
    particularProperty: any[]
  ) {
    const toCompare = term.toLowerCase();
    return values.filter((value) => {
      if (
        typeof value === 'string' &&
        value.toString().toLowerCase().includes(toCompare)
      )
        return value;
      if (particularProperty.length > 0) {
        for (let property of particularProperty) {
          if (value[property] === null || value[property] === undefined)
            continue;
          if (value[property].toString().toLowerCase().includes(toCompare))
            return true;
        }
      } else {
        for (let property in value) {
          if (value[property] === null || value[property] === undefined)
            continue;
          if (value[property].toString().toLowerCase().includes(toCompare))
            return true;
        }
      }

      return false;
    });
  }
}
