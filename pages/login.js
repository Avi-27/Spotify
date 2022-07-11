import { getProviders, signIn } from "next-auth/react";

function Login({ providers }) {
  return (
    <div className="flex items-center justify-center flex-col bg-black min-h-screen">
      <h1 className="text-white mb-5 text-lg p-5 font-bold cursor-text text-[30px] ">
        Sign In to Spotify
      </h1>
      <img src="https://links.papareact.com/9xl" alt="" className="w-52 mb-5" />
      {Object.values(providers).map((provider) => (
        <div key={provider.name} className="">
          <button
            className="bg-[#18D860] p-3 rounded-lg text-white cursor-pointer"
            onClick={() =>
              signIn(provider.id, {
                callbackUrl: "/",
              })
            }
          >
            Login with {provider.name}
          </button>
        </div>
      ))}
    </div>
  );
}

export default Login;

export async function getServerSideProps() {
  const providers = await getProviders();
  // console.log("providers", providers);

  return {
    props: {
      providers,
    },
  };
}
