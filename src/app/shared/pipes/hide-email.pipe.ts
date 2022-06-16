import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'hideEmail',
})
export class HideEmailPipe implements PipeTransform {
  transform(value: string): string {
    let email = value;
    const numberCharHideBefore = value.indexOf('@') - 2;
    const numberCharHideAfter = value.lastIndexOf('.') - value.indexOf('@') - 2; // -1 for show 1 char and -1 for except '.'
    let stringReplaceBefore = this.addPartials(numberCharHideBefore);
    let stringReplaceAfter = this.addPartials(numberCharHideAfter);

    email = email.replace(/(?<=^[A-Za-z0-9]{1}).*?(?=@)/, stringReplaceBefore);
    email = email.replace(/(?<=@[a-zA-Z]).[a-zA-Z]*/, stringReplaceAfter);
    return email;
  }

  addPartials(length: number) {
    let temp = '';
    for (let i = 0; i < length; i++) {
      temp += '*';
    }
    return temp;
  }
}
