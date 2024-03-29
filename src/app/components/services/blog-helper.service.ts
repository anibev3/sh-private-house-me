import { Injectable, AfterContentInit, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import authors from '../data/authors.json';
import blog from '../data/blog.json';
import blogcategory from '../data/blogcategory.json';
import blogtags from '../data/blogtags.json';

@Injectable({
  providedIn: 'root',
})
export class BlogHelperService implements AfterContentInit, OnInit {
  // pagination
  page: number = 1;
  public blogpost = blog;
  public blogdetails = blog;
  public category = blogcategory;
  public blogcategory = blogcategory;
  public tags = blogtags;
  public blogtags = blogtags;
  public author = authors;
  public searchText: string;
  public searchQuery: string;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer
  ) {
    this.searchText = '';
    this.searchQuery = '';
  }
  // category
  public getCategories(items: string | any[]) {
    var elems = blogcategory.filter((item: { id: string }) => {
      return items.includes(item.id);
    });
    return elems;
  }
  // Tags
  public getTags(items: string | any[]) {
    var elems = blogtags.filter((item: { id: string }) => {
      return items.includes(item.id);
    });
    return elems;
  }
  // Author
  public getAuthor(items: string | any[]) {
    var elems = authors.filter((item: { id: string }) => {
      return items.includes(item.id);
    });
    return elems;
  }
  // Count Category
  public setCategoriesCount() {
    for (var i = 0; i < this.blogcategory.length; i++) {
      var count = this.blogpost.filter((post: { categories: number[] }) => {
        return post.categories.includes(parseInt(this.blogcategory[i].id));
      });
      count = count.length;
      this.blogcategory[i].count = count;
    }
  }
  // Search Filter
  onSubmit() {
    if (this.searchText === '') {
      return;
    } else {
      this.router.navigate(['blog/search', this.searchText]);
    }
  }
  // Filter
  // Category Filter
  public setCategory(id: any) {
    this.blogcategory = id;
  }
  public getCategory() {
    return this.blogcategory;
  }
  public getPostsByCategory(catId: string) {
    return (this.blogpost = blog.filter((item: { categories: number[] }) => {
      return item.categories.includes(parseInt(catId));
    }));
  }
  // Tag Filter
  public setTag(id: any) {
    this.blogtags = id;
  }
  public getTag() {
    return this.blogtags;
  }
  public getPostsByTags(tagId: string) {
    return (this.blogpost = blog.filter((item: { tags: number[] }) => {
      return item.tags.includes(parseInt(tagId));
    }));
  }
  // Author Filter
  public setAuthor(id: any) {
    this.author = id;
  }
  public getAuthorPost() {
    return this.author;
  }
  public getPostsByAuthors(userId: string) {
    return (this.blogpost = blog.filter((item: { author: number[] }) => {
      return item.author.includes(parseInt(userId));
    }));
  }
  // Search Filter
  public setSearch(query: string) {
    this.searchQuery = query;
  }
  public getSearch() {
    return this.searchQuery;
  }
  public getPostsBySearch(query: string) {
    return (this.blogpost = blog.filter((item: { title: string }) => {
      return item.title.toLowerCase().includes(query.toLowerCase());
    }));
  }
  // Fetch All filter
  public setPosts() {
    var postsByCategory =
        this.getCategory() != undefined
          ? this.getPostsByCategory(this.getCategory())
          : '',
      postsByTags =
        this.getTag() != undefined ? this.getPostsByTags(this.getTag()) : '',
      postsByAuthor =
        this.getAuthorPost() != undefined
          ? this.getPostsByAuthors(this.getAuthorPost())
          : '',
      postsBySearch =
        this.getSearch() != undefined
          ? this.getPostsBySearch(this.getSearch())
          : '';

    if (
      (postsByCategory != '' ||
        postsByCategory != undefined ||
        postsByCategory != null) &&
      postsByCategory.length > 0
    ) {
      this.blogpost = postsByCategory;
    } else if (
      (postsByTags != '' || postsByTags != undefined || postsByTags != null) &&
      postsByTags.length > 0
    ) {
      this.blogpost = postsByTags;
    } else if (
      (postsByAuthor != '' ||
        postsByAuthor != undefined ||
        postsByAuthor != null) &&
      postsByAuthor.length > 0
    ) {
      this.blogpost = postsByAuthor;
    } else if (
      (postsBySearch != '' ||
        postsBySearch != undefined ||
        postsBySearch != null) &&
      postsBySearch.length > 0
    ) {
      this.blogpost = postsBySearch;
    }
  }
  // Related post
  public getPostByCategory(items: string | any[]) {
    var elems = blog.filter((post: { id: string; categories: any[] }) => {
      return (
        parseInt(post.id) !== parseInt(this.route.snapshot.params.id) &&
        post.categories.some((r) => items.includes(r))
      );
    });
    return elems;
  }
  // Post Details
  public setPost(id: any) {
    this.blogdetails = blog.filter((item: { id: any }) => {
      return item.id == id;
    });
  }
  ngAfterContentInit(): void {
    // this.setCategory(this.route.snapshot.params.catId);
    // this.setTag(this.route.snapshot.params.tagId);
    // this.setAuthor(this.route.snapshot.params.userId);
    // this.setSearch(this.route.snapshot.params.query);
    // this.setPosts();
    this.setPost(5);
    this.setCategory(5);
    this.setTag(5);
    this.setAuthor(5);
    // this.setSearch();
    this.setPosts();
    this.setPost(5);
  }
  // Post Navigation
  public postnavigation(items: string | any[], index: number) {
    var output = [],
      id,
      item;
    if (items[index - 1] !== undefined && index - 1 !== -1) {
      item = items[index - 1];
      id = item.id;
      // Show the previous button
      output.push(
        "<div class='prev-post'> <span>Prev Post</span> <a href='/blog-details/" +
          item.id +
          "'>" +
          item.title.slice(0, 20) +
          '</a></div>'
      );
    }
    if (items[index + 1] !== undefined && index <= items.length - 1) {
      // Show next button
      item = items[index + 1];
      id = item.id;
      output.push(
        "<div class='next-post'> <span>Next Post</span> <a href='/blog-details/" +
          item.id +
          "'>" +
          item.title.slice(0, 20) +
          '</a></div>'
      );
    }

    return output;
  }
  // sanitize url
  public sanitnizeAudioURL(url: string) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
  // Recent post
  public changeToMonth(month: string | number | any) {
    var months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];
    return months[month];
  }

  public setDemoDate() {
    var today = new Date();
    this.blogpost.slice(0, 3).map(
      (post: { timestamp: number; postdate: string }) => (
        (post.timestamp = today.getTime() - 3 * 24 * 60 * 60 * 1000),
        // Remove this date on your live demo. This is only used for preview purposed. Your date should actually be updated
        // in the blog.json object
        (post.postdate = `${this.changeToMonth(today.getMonth())} ${
          today.getDate() - 2
        }, ${today.getFullYear()}`)
      )
    );
  }

  public recentPost() {
    var elems = blog.filter(
      (post: { timestamp: number | any; postdate: string | number | Date }) => {
        return post.timestamp < new Date(post.postdate);
      }
    );
    return elems;
  }

  ngOnInit(): void {
    this.setCategoriesCount();
    this.setDemoDate();
  }
}
