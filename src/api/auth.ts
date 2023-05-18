

type LoginResponse = {
  token: string
}

export async function login(email: string, password: string): Promise<LoginResponse> {
  // const response = await axios.post<LoginResponse>('/auth/login', {
  //   email,
  //   password,
  // })
  // return response.data
  await new Promise(resolve => setTimeout(resolve, 500))
  console.log('login', email, password);
  return { token: 'placeholder' }
}

export async function logout(): Promise<void> {
  // await axios.post('/auth/logout')
  await new Promise(resolve => setTimeout(resolve, 500))
}


export async function register(email: string, password: string): Promise<void> {
  // await axios.post('/auth/register', {
  //   email,
  //   password,
  // })
  await new Promise(resolve => setTimeout(resolve, 500))
  console.log('register', email, password)
}