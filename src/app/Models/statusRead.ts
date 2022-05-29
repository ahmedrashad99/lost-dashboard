import { Pipe, PipeTransform } from "@angular/core";


@Pipe({
    name: 'statusRead'
})

export class statusRead implements PipeTransform{
    transform(n: number) {
        if (n === 0) {
            return 'Not Found'
        }
        else {
            return 'Found'
        }
    }
}