describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = { name: 'Matti Luukkainen', username: 'mluukkai', password: 'salainen' }
    cy.request('POST', 'http://localhost:3003/api/users/', user)

    cy.visit('http://localhost:3000')

  })
  it('Login form is shown', function() {
    cy.contains('log in')
    cy.contains('login').click()
    cy.contains('username')
    cy.contains('password')
  })

  it('login form can be opened', function() {
    cy.contains('login').click()
  })


  describe('Login', function() {
    it('succeeds with correct credentials', function() {
      cy.contains('login').click()
      cy.get('#username').type('mluukkai')
      cy.get('#password').type('salainen')
      cy.get('#loginButton').click()
      cy.contains('Matti Luukkainen logged in')
    })
    it('fails with wrong credentials', function() {
      cy.contains('login').click()
      cy.get('#username').type('mluukkai')
      cy.get('#password').type('wrong')
      cy.get('#loginButton').click()

      cy.get('.error').contains('Wrong credentials')
      cy.get('html').should('not.contain', 'Matti Luukkainen logged in')
    })
  })


  describe('When logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'mluukkai', password: 'salainen' })
    })
    it('A blog can be created', function() {
      cy.contains('new blog').click()
      cy.get('#title').type('E2E Test blog')
      cy.get('#author').type('Max Mustermann')
      cy.get('#url').type('www.maxmustermann.de')
      cy.get('#create').click()
      cy.contains('E2E Test blog')
    })
    describe('and a blog exists', function() {
      beforeEach(function() {
        cy.createBlog({
          title: 'blog title',
          author: 'Max Mustermann',
          url: 'www.maxmustermann.de',
          likes: 0
        })
      })
      it('can be liked', function() {
        cy.contains('view').click()
        cy.get('#like').click()
        cy.contains('you liked the blog')
      })

      it('can be deleted by the user who created it', function() {
        cy.contains('blog title Max Mustermann')
        cy.contains('view').click()
        cy.get('#remove').click()
        cy.contains('you removed the blog')
        cy.visit('http://localhost:3000')
        cy.get('html').should('not.contain', 'blog title Max Mustermann')
      })
    })

    describe('and more than one blogs exist', function() {
      beforeEach(function() {
        cy.createBlog({
          title: 'blog 1',
          author: 'Max Mustermann',
          url: 'www.maxmustermann.de',
          likes: 5
        })
        cy.createBlog({
          title: 'blog 2',
          author: 'Max Mustermann',
          url: 'www.maxmustermann.de',
          likes: 10
        })
        cy.createBlog({
          title: 'blog 3',
          author: 'Max Mustermann',
          url: 'www.maxmustermann.de',
          likes: 8
        })
      })
      it('should list the blogs ordered according to likes', function() {
        cy.get('.blog').eq(0).should('contain', 'blog 2')
        cy.get('.blog').eq(1).should('contain', 'blog 3')
        cy.get('.blog').eq(2).should('contain', 'blog 1')
      })
    })
  })
})
