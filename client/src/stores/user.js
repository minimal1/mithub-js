/** @format */

import { observable, action } from "mobx";
import axios from "axios";

export default class UserStore {
  @observable userInfo = {
    userName: "",
    email: "",
    avatarUrl: "",
    loadedActivities: [],
    loading: false,
    currentPage: 0,
    lastPage: -1,
    accessToken: null,
  };

  constructor(root) {
    this.root = root;
    this.currentIdx = 0;
    this.userInfo.accessToken = null;
  }

  @action login = async (data) => {
    this.userInfo = {
      ...this.userInfo,
      loadedActivities: [],
      userName: data.user_name,
      email: data.email,
      avatarUrl: data.avatar_url,
      currentPage: 0,
      lastPage: -1,
      accessToken: data.access_token,
    };
    this.currentIdx = 0;

    await this.loadNextPage();
  };

  @action logout = async () => {
    this.userInfo = {
      userName: "",
      email: "",
      avatarUrl: "",
      loadedActivities: [],
      loading: false,
      currentPage: 0,
      lastPage: -1,
      accessToken: null,
    };
    this.currentIdx = 0;
  };

  @action loadNextPage = async () => {
    try {
      this.userInfo.loading = true;
      await this.getEvents();
      this.userInfo.loading = false;
    } catch (error) {
      console.log(error);
    }
  };

  parsingEvent = (event) => {
    const { type, actor, payload, created_at, id, repo } = event;
    const last = this.userInfo.loadedActivities[
      this.userInfo.loadedActivities.length - 1
    ];
    if (last !== undefined && last.id.split("/")[0] <= id) return;

    let eventDict = {
      id,
      createdAt: created_at,
      avatarUrl: actor.avatar_url,
      username: actor.login,
      type,
      repoName: repo.name,
    };

    if (
      (type === "WatchEvent" && payload.action === "started") ||
      (type === "CreateEvent" && payload.ref_type === "repository") ||
      type === "PublicEvent"
    ) {
      //repository 처리
      this.userInfo.loadedActivities.push({
        ...eventDict,
        repoUrl: repo.url,
      });
    } else if (type === "ForkEvent") {
      this.userInfo.loadedActivities.push({
        ...eventDict,
        fromRepo: repo.name,
        toRepo: payload.forkee.full_name,
        fromRepoUrl: repo.url,
      });
    } else if (
      (type === "IssuesEvent" || type === "PullRequestEvent") &&
      payload.action === "opened"
    ) {
      const labels =
        type === "IssuesEvent"
          ? payload.issue.labels
          : payload.pull_request.labels;

      const labelEvents = [];

      labels.forEach((label) => {
        if (label.name === "help wanted" || label.name === "good first issue") {
          if (type === "IssuesEvent") {
            labelEvents.push({
              ...eventDict,
              id: id + "/" + label.name,
              issue: {
                number: payload.issue.number,
                label: label.name,
                color: label.color,
                title: payload.issue.title,
                body: payload.issue.body,
              },
            });
          } else {
            labelEvents.push({
              ...eventDict,
              id: id + "/" + label.name,

              pull_request: {
                number: payload.number,
                label: label.name,
                color: label.color,
                title: payload.pull_request.title,
                body: payload.pull_request.body,
                additions: payload.pull_request.additions,
                deletions: payload.pull_request.deletions,
              },
            });
          }
        }
      });

      labelEvents
        .reverse()
        .forEach((event) => this.userInfo.loadedActivities.push(event));
    } else if (type === "PushEvent" && payload.head !== payload.before) {
      const commits = payload.commits.map((commit) => {
        return {
          userName: commit.author.name,
          userEmail: commit.author.email,
          message: commit.message,
          sha: commit.sha,
        };
      });

      this.userInfo.loadedActivities.push({
        ...eventDict,
        before: payload.before,
        head: payload.head,
        size: payload.size,
        ref: payload.ref,
        commits,
      });
    }
  };

  getEvents = async () => {
    let res, data, links;
    let startLength = this.userInfo.loadedActivities.length;
    while (
      this.userInfo.lastPage < 0 ||
      this.userInfo.currentPage < this.userInfo.lastPage
    ) {
      if (this.userInfo.accessToken)
        res = await axios.get(
          `https://api.github.com/users/${this.userInfo.userName}/received_events`,
          {
            headers: {
              Authorization: `token ${this.userInfo.accessToken}`,
            },
            params: {
              page: this.userInfo.currentPage + 1,
            },
          }
        );
      else
        res = await axios.get(`https://api.github.com/events`, {
          params: {
            page: this.userInfo.currentPage + 1,
          },
        });
      console.log(res);
      data = res.data;
      links = res.headers.link.split(",");

      if (this.userInfo.lastPage < 0) {
        links.forEach((link) => {
          const rel = link.split("rel=")[1];
          const page = link.split("?page=")[1][0];
          if (rel === '"last"') this.userInfo.lastPage = parseInt(page);
        });
        console.log(this.userInfo.lastPage);
      }

      for (let i = this.currentIdx; i < data.length; i++) {
        this.parsingEvent(data[i]);
        this.currentIdx = (this.currentIdx + 1) % 30;
        if (
          this.userInfo.loadedActivities.length > startLength &&
          this.userInfo.loadedActivities.length % 30 === 0
        ) {
          console.log(this.userInfo.loadedActivities.length);
          return;
        }
      }

      this.userInfo.currentPage++;
    }
  };
}
