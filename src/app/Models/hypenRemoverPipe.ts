import { Pipe, PipeTransform } from "@angular/core";


@Pipe({
    name: 'hypenRemoverPipe'
})

export class hypenRemoverPipe implements PipeTransform{
    transform(str: string) {
        str = str.replace(/-/g, ' ');
        return str;
    }
}