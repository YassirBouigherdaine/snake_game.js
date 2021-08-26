// JavaScript source code

document.addEventListener('DOMContentLoaded', () => {

    const squares = document.querySelectorAll('.myGrid div')
    const start_button = document.querySelector('.start')
    const display_score = document.querySelector('.myScore span')
    const width = 10
    let applePos = 0 
    let snake = [2, 1, 0]
    let direction = 1
    let score = 0
    let intervalTime = 0
    let interval = 0

    document.addEventListener('keyup', moveSnake)
    start_button.addEventListener('click', startGame)

    function startGame() {
        snake.forEach(index => squares[index].classList.remove('snake'))
        squares[applePos].classList.remove('apple')
        clearInterval(interval)

        score = 0
        generateApple()
        direction = 1
        display_score.innerText = score
        intervalTime = 400
        snake = [2, 1, 0]

        snake.forEach(index => squares[index].classList.add('snake'))
        interval = setInterval(snakeCollision, intervalTime)
    }

    function snakeCollision() {

        //snake hitting border or his body
        
        if (
            (snake[0] + width >= 100 && direction === width) ||              // bottom wall
            (snake[0] % width === width - 1 && direction === 1) ||           // right wall
            (snake[0] % width === 0 && direction === -1) ||                  // left wall
            (snake[0] - width < 0 && direction === -width) ||                // top wall
            squares[snake[0] + direction].classList.contains('snake')        // collision with snake body
        ) {
            alert('Game over')
            return clearInterval(interval)                            // clear the interval 
           
        }

        const tail = snake.pop() 
        squares[tail].classList.remove('snake') 

        //giving direction to the head 
        snake.unshift(snake[0] + direction)         

        //collision with apple

        while(squares[snake[0]].classList.contains('apple')) {
            squares[applePos].classList.remove('apple')
            generateApple()
            squares[tail].classList.add('snake')
            snake.splice(snake.length,0,tail)                        // adding tail 
            score++
            display_score.textContent = score
            clearInterval(interval)
            interval = setInterval(snakeCollision, intervalTime)
        }
        squares[snake[0]].classList.add('snake')
    }


    //generate new apple 

    function generateApple() {
        applePos = Math.floor(Math.random() * squares.length)
        
        while (squares[applePos].classList.contains('snake')) {
            squares[applePos].classList.remove('apple')
            applePos = Math.floor(Math.random() * squares.length)
        }
        squares[applePos].classList.add('apple')
    }


    //moving the snake

    function moveSnake(dir) {

        switch (dir.keyCode) {
            case 38:
                direction = -width                 // go up
                break;
            case 40:
                direction = +width                // go down
                break;
            case 39:
                direction = 1                     // go right
                break;
            case 37:
                direction = -1                    // go left
                break;
        }
    }
})
