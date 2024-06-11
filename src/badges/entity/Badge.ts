interface BadgeProps {
  id?: number;
  slug: string;
  name: string;
  imageUrl: string;
}

export class Badge {
  public id?: number;
  public slug: string;
  public name: string;
  public imageUrl: string;

  constructor(props: BadgeProps) {
    this.id = props.id;
    this.slug = props.slug;
    this.name = props.name;
    this.imageUrl = props.imageUrl;
  }
}