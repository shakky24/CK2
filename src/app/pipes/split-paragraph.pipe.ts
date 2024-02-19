import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'splitParagraph',
  standalone:true,
})
export class SplitParagraphPipe implements PipeTransform {

  transform(value: string, maxWordsPerParagraph: number): string[] {
    if (!value) return [];

    const sentences = value.split(/[.!?]/); // Split by common sentence-ending punctuation
    let currentParagraph = '';

    const paragraphs: string[] = [];

    sentences.forEach(sentence => {
        const wordsInSentence = sentence.split(' ');
        if (currentParagraph.split(' ').length + wordsInSentence.length <= maxWordsPerParagraph) {
            currentParagraph += sentence + ' ';
        } else {
            paragraphs.push(currentParagraph.trim());
            currentParagraph = sentence + ' ';
        }
    });

    if (currentParagraph.trim().length > 0) {
        paragraphs.push(currentParagraph.trim());
    }

    return paragraphs;
}


}
