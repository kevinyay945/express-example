'use strict';

var app      = require('../../app');
var expect   = require('expect.js');
var request  = require('supertest');

describe.only('user creation page', function () {
  before(async function () {
      await require('../../models').sequelize.sync();
  });
  
  beforeEach(async function () {
    this.models = require('../../models');
    await this.models.Task.destroy({ truncate: true })
    await this.models.User.destroy({ truncate: true })

  });

  it('透過 api 取得特定 user 之所有 task list 資料', async function () {
    let username = 'johndoe';
    let user = await this.models.User.create({
      username
    });
    
    await this.models.Task.create({
      title: 'johndoe task',
      UserId: user.id
    });

    let response = await request(app).get(`/api/users/${username}/tasks`);
    let result = response.body;

    expect(result.tasks).to.be.an('array');
    expect(result.tasks[0])
      .to.be.an('object')
      .and.to.have.property("title");
  });

  it('透過 api 新增特定 user 之 task 資料', async function () {
    let username = 'andy';
    await this.models.User.create({
      username
    });

    let taskData = {
      title: "andy task"
    }


    let response = await request(app)
      .post(`/api/users/${username}/tasks/create`)
      .send(taskData);
    let result = response.body;
    
    expect(result.task)
      .to.be.an('object')
      .and.to.have.property("title");
  });

  it('透過 api 更新 task 之 completed 狀態', async function () {
    let username = 'frank';
    let user = await this.models.User.create({
      username
    });

    let task = await this.models.Task.create({
      title: 'frank task',
      UserId: user.id,
      completed: false
    });

    let taskData = {
      completed: true
    }

    let response = await request(app)
      .put(`/api/task/${task.id}`)
      .send(taskData);
    let result = response.body;

    expect(result.task)
      .to.be.an('object')
      .and.to.have.property("title")
      .and.to.have.property("completed");
    expect(result.task.completed).to.equal(true);
  });


});
