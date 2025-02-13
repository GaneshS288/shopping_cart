function Login() {
    return(
        <div>
            <form action="">
                <label htmlFor="username">
                    Username :
                    <input type="text" id="username" name="username" required/>
                </label>

                <button type="submit">Log in as User</button>
            </form>

            <button type="button">Log in as Guest</button>
        </div>
    );
}

export default Login;