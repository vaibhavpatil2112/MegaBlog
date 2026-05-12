import conf from "../conf/conf";
import { Client, ID, Databases, Storage, Query } from "appwrite";

export class Service {
  client = new Client();
  databases;
  bucket;
  constructor() {
    this.client
      .setEndpoint(conf.appwriteurl)
      .setProject(conf.appwriteprojectid);
    this.databases = new Databases(this.client);
    this.bucket = new Storage(this.client);
  }

  async createPost({ title, slug, content, fraturedImage, status, userId }) {
    try {
      await this.databases.createDocument(
        conf.appwritedatabaseid,
        conf.appwritecollectionid,
        slug,
        { title, content, fraturedImage, status, userId },
      );
    } catch (error) {
      console.log("Appwrite service :: createPost :: error ", error);
    }
  }
  async updatepost(slug, { title, content, fraturedImage, status }) {
    try {
      await this.databases.updateDocument(
        conf.appwritedatabaseid,
        conf.appwritecollectionid,
        slug,
        { title, content, fraturedImage, status },
      );
    } catch (error) {
      console.log("Appwrite service :: updatepost :: error ", error);
    }
  }

  async deletepost(slug) {
    try {
      await this.databases.deleteDocument(
        conf.appwritedatabaseid,
        conf.appwritecollectionid,
        slug,
      );
      return true;
    } catch (error) {
      console.log("Appwrite service :: deletepost :: error ", error);
      return false;
    }
  }
  async getPosts(slug) {
    try {
      return await this.databases.getDocuments(
        conf.appwritedatabaseid,
        conf.appwritecollectionid,
        slug,
      );
    } catch (error) {
      console.log("Appwrite service :: getPosts :: error ", error);
      return false;
    }
  }
  async getPosts(queries = [Query.equal("status", "active")]) {
    try {
      return await this.databases.getDocuments(
        conf.appwritedatabaseid,
        conf.appwritecollectionid,
        queries,
      );
    } catch (error) {
      console.log("Appwrite service :: getPosts :: error ", error);
      return false;
    }
  }

//   Upload and delete files from appwrite storage bucket
  async uploadfile(file) {
    try {
      return await this.bucket.createFile(
        conf.appwritebucketid,
        ID.unique(),
        file,
      );
    } catch (error) {
      console.log("Appwrite service :: uploadfile :: error ", error);
    }
  }
  async deletefile(fileId) {
    try {
      return await this.bucket.deleteFile(conf.appwritebucketid, fileId);
      return true;
    } catch (error) {
      console.log("Appwrite service :: deletefile :: error ", error);
      retu;
    }
  }
  getfilepreview(fileId) {
    return this.bucket.getFilePreview(conf.appwritebucketid, fileId);
  }
}

const service = new Service();

export default Service;
