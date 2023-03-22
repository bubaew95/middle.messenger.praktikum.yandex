export type Indexed<T = any> = {
    [key in string]: T;
};


interface IFile {
  content_size: number;
  content_type: string;
  filename: string;
  id: number;
  path: string;
  upload_date: string;
  user_id: number;
}
  
export function merge(lhs: Indexed, rhs: Indexed): Indexed {
    for (let p in rhs) {
      if (!rhs.hasOwnProperty(p)) {
        continue;
      }
  
      try {
        if (rhs[p].constructor === Object) {
          rhs[p] = merge(lhs[p] as Indexed, rhs[p] as Indexed);
        } else {
          lhs[p] = rhs[p];
        }
      } catch (e) {
        lhs[p] = rhs[p];
      }
    }
  
    return lhs;
}
  
export function set(object: Indexed | unknown, path: string, value: unknown): Indexed | unknown {
    if (typeof object !== 'object' || object === null) {
        return object;
    }

    if (typeof path !== 'string') {
        throw new Error('path must be string');
    }

    const result = path.split('.').reduceRight<Indexed>((acc, key) => ({
        [key]: acc,
    }), value as any);

    return merge(object as Indexed, result);
}  


export function getAvatar(avatar: string): string {
  return avatar
        ? `https://ya-praktikum.tech/api/v2/resources${avatar}` 
        : 'https://cs6.pikabu.ru/avatars/1121/x1121129-2144512139.png';
}

export function getFile (file: IFile) {
  if(file.content_type.includes('image')) {
      return `<img src="${getAvatar(file.path)}" alt="${file.filename}"\>`;
  } else if(file.content_type.includes('video')) {
      return `<video src="${getAvatar(file.path)}" autoplay poster="${getAvatar(file.path)}"></video>`;
  } else {
      return `<div class="media_file"><i class="ib media-file"> ${file.filename}</div>`
  }
}

 