package io.socket.thread;


import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.ThreadFactory;
import java.util.logging.Level;
import java.util.logging.Logger;


/**
 * The thread for event loop. All non-background tasks run within this thread.
 */
public class EventThread extends Thread {

    private static final Logger logger = Logger.getLogger(EventThread.class.getName());

    private static final ThreadFactory THREAD_FACTORY = new ThreadFactory() {
        @Override
        public Thread newThread(Runnable runnable) {
            thread = new EventThread(runnable);
            thread.setName("EventThread");
            thread.setDaemon(Thread.currentThread().isDaemon());
            return thread;
        }
    };

    private static EventThread thread;

    private static ExecutorService service;

    private static int counter = 0;


    private EventThread(Runnable runnable) {
        super(runnable);
    }

    /**
     * check if the current thread is EventThread.
     *
     * @return true if the current thread is EventThread.
     */
    public static boolean isCurrent() {
        return currentThread() == thread;
    }

    /**
     * Executes a task in EventThread.
     *
     * @param task
     */
    public static void exec(Runnable task) {
        if (isCurrent()) {
            task.run();
        } else {
            nextTick(task);
        }
    }

    /**
     * Executes a task on the next loop in EventThread.
     *
     * @param task
     */
    public static void nextTick(final Runnable task) {
        ExecutorService executor;
        synchronized (EventThread.class) {
          counter++;
          if (service == null) {
              service = Executors.newSingleThreadExecutor(THREAD_FACTORY);
          }
          executor = service;
        }

        executor.execute(new Runnable() {
            @Override
            public void run() {
                try {
                    task.run();
                } catch (Throwable t) {
                    logger.log(Level.SEVERE, "Task threw exception", t);
                    throw t;
                } finally {
                    synchronized (EventThread.class) {
                        counter--;
                        if (counter == 0) {
                            service.shutdown();
                            service = null;
                            thread = null;
                        }
                    }
                }
            }
        });
    }
}
