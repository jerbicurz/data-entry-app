export default function CreateUserForm() {
  return (
      <div className="mt-10 sm:mt-0">
          <div className="md:grid md:grid-cols-3 md:gap-6">
              <div className="md:col-span-1">
              <div className="px-4 sm:px-0">
                  <h3 className="text-lg font-medium leading-6 text-gray-900">User Input</h3>
              </div>
              </div>
              <div className="mt-5 md:mt-0 md:col-span-2">
              <form action="#" method="POST">
                  <div className="shadow overflow-hidden sm:rounded-md">
                  <div className="px-4 py-5 bg-white sm:p-6">
                      <div className="grid grid-cols-6 gap-6">
                      
                      <div className="col-span-6 sm:col-span-3" key='name'>
                          <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                          <input type="text" name="name" id="name" className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" required />
                      </div>

                      <div className="col-span-6 sm:col-span-3" key='age'>
                          <label htmlFor="age" className="block text-sm font-medium text-gray-700">Age</label>
                          <input type="text" name="age" id="age" className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                      </div>

                      <div className="col-span-6 sm:col-span-4" key='title'>
                          <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
                          <input type="text" name="title" id="title" className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" required />
                      </div>

                      <div className="col-span-6" key='hometown'>
                          <label htmlFor="hometown" className="block text-sm font-medium text-gray-700">Hometown</label>
                          <input type="text" name="hometown" id="hometown" className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                      </div>

                      </div>
                  </div>
                  <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                      <button type="submit" className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                      Save
                      </button>
                  </div>
                  </div>
              </form>
              </div>
          </div>
      </div>
  )
}