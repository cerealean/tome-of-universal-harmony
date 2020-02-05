import { Component, OnInit } from '@angular/core';
import { Item, ItemTypes, DamageTypes } from './models/item';

@Component({
  selector: 'app-compendium-editor',
  templateUrl: './compendium-editor.component.html',
  styleUrls: ['./compendium-editor.component.scss']
})
export class CompendiumEditorComponent implements OnInit {
  public itemTypes = ItemTypes;

  public items: Item[] = [
    <any>{
      name: "Rawr",
      magic: true,
      weight: 5,
      type: ItemTypes.Ammunition,
      dmgType: DamageTypes.Piercing
    }
  ];

  constructor() { }

  ngOnInit() {
  }

  loadFile(event: Event) {
    this.items = [];
    const file = event.target['files'][0] as Blob;
    console.log(event.target['files'], file);
    file.text().then(fileText => {
      if(!fileText) return;
      const stuff = new DOMParser().parseFromString(fileText, "application/xml");
      stuff.getRootNode().childNodes[0].childNodes.forEach((itemNode, index) => {
        if(index >= 10 || itemNode.nodeName == "#text") {
          return;
        }
        const newItem = new Item();
        itemNode.childNodes.forEach(itemAttrsNode => {
          if(itemAttrsNode.nodeName == "#text") return;
          newItem[itemAttrsNode.nodeName] = itemAttrsNode.textContent;
        });
        this.items.push(newItem);
      });
    }).finally(() => console.log(this.items));
  }

  public base64Files: string[] = [];
  private fileReader = new FileReader();

  public onChange(event: Event) {
    if (event.target['files']) {
      console.log(event.target['files']);
      this.readFiles(event.target['files'], 0);
    }
  };

  private readFiles(files: any[], index: number) {
    let file = files[index];
    this.fileReader.onload = () => {
      this.base64Files.push(this.fileReader.result as string);
      if (files[index + 1]) {
        this.readFiles(files, index + 1);
      } else {
        console.log('loaded all files');
      }
    };
    this.fileReader.readAsDataURL(file);
    console.log(this.base64Files);
  }

}

interface Blob {
  text(): Promise<string>;
}
