import { Component, OnInit } from '@angular/core';
import { Item, ItemTypes, DamageTypes } from './models/item';

@Component({
  selector: 'app-compendium-editor',
  templateUrl: './compendium-editor.component.html',
  styleUrls: ['./compendium-editor.component.scss']
})
export class CompendiumEditorComponent implements OnInit {
  public itemTypes = ItemTypes;

  public items: Item[] = [];
  public page = 1;
  public itemsPerPage = 10;
  public isLoading = false;

  constructor() { }

  ngOnInit() {
    [...Array(30).keys()].map(num => {
      const item = new Item();
      item.name = num.toString();
      item.weight = Math.floor(Math.random() * num);
      this.items.push(item);
    });
  }

  loadFile(event: Event) {
    this.isLoading = true;
    this.items = [];
    const file = (event.target as HTMLInputElement).files[0] as unknown as Blob;
    file.text().then(fileText => {
      if (!fileText) { return; }
      const stuff = new DOMParser().parseFromString(fileText, 'application/xml');
      stuff.getRootNode().childNodes[0].childNodes.forEach((itemNode) => {
        if (itemNode.nodeName === '#text') { return; }
        const newItem = new Item();
        itemNode.childNodes.forEach(itemAttrsNode => {
          if (itemAttrsNode.nodeName === '#text') { return; }
          newItem[itemAttrsNode.nodeName] = itemAttrsNode.textContent;
        });
        this.items.push(newItem);
      });
    }).finally(() => {
      this.isLoading = false;
    });
  }

  pageChange(pageNumber) {
    this.page = pageNumber;
  }

}

interface Blob {
  text(): Promise<string>;
}
