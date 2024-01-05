export interface bookinput {
  bookname: { value: string };
  cowner: { value: string };
  contentowner: { value: string };
  publisher: { value: number };
  bookuniqid: { value: string };
  bookname: { value: string };
  coverphoto: { value: string };
  prize: { value: number };
}
export interface bookdata {
  idx: number;
  book_uniq_idx: string;
  bookname: string;
  content_owner: { name: string };
  publisher: { name: string };
  cover_photo: string;
  prize: number;
  created_timetick: Date;
}
